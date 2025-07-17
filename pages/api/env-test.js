export default function handler(req, res) {
  res.status(200).json({ 
    mongodbUriExists: process.env.MONGODB_URI ? true : false,
    // Don't show the actual URI for security reasons
    mongodbUriFirstChars: process.env.MONGODB_URI ? process.env.MONGODB_URI.substring(0, 20) + '...' : 'undefined'
  });
}