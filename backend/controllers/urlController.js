const Url = require('../models/Url');
const Counter = require('../models/Counter');
const { encodeBase62 } = require('../utils/base62');

const OFFSET = 916132832;

async function getNextSequence() {
    const counter = await Counter.findOneAndUpdate(
        {
            _id: 'urlCount'
        },
        {
            $inc: {
                seq: 1
            }
        },
        {
            returnDocument: 'after',
            upsert: true
        }
    );

    return counter.seq;
}

function isValidUrl(string) {
    try {
        const parsed = new URL(string);

        return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    }
    catch (error) {
        return false;
    }
}

const shortenUrl = async (req, res) => {
    try {
        const { longUrl } = req.body;

        if (!longUrl || !isValidUrl(longUrl)) {
            return res.status(400).json({
                message: 'Please provide a valid URL, including http:// or https://'
            });
        }
        const sequenceNumber = await getNextSequence();

        const shortCode = encodeBase62(sequenceNumber + OFFSET - 1);

        const newUrl = await Url.create({ longUrl, shortCode });

        return res.status(201).json({
            longUrl: newUrl.longUrl,
            shortCode: newUrl.shortCode,
            shortUrl: `${process.env.BASE_URL}/${newUrl.shortCode}`,
            clicks: newUrl.clicks,
            createdAt: newUrl.createdAt
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong while shortening the URL' });
    }
};

const getAllUrls = async (req, res) => {
    try {
        const urls = await Url.find().sort({ createdAt: -1 });

        const formatted = urls.map((url) => ({
            longUrl: url.longUrl,
            shortCode: url.shortCode,
            shortUrl: `${process.env.BASE_URL}/${url.shortCode}`,
            clicks: url.clicks,
            createdAt: url.createdAt
        }));

        return res.status(200).json(formatted);

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            message: 'Something went wrong while fetching URLs'
        });

    }

};

const redirectToLongUrl = async (req,res) => {
    try{
        const {code} = req.params;
        const url  = await Url.findOne({
            shortCode: code
        });
        if(!url){
            return res.status(404).json({
                message: 'Short link not found' 
            })
        }
        url.clicks +=1;
        url.clickHistory.push({
            timestamp: new Date()
        });
        await url.save();

        return res.redirect(302,url.longUrl);
    }
    catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong while redirecting' });
  }

}

module.exports = {shortenUrl,getAllUrls,redirectToLongUrl};