import fetch from "node-fetch";
import pkg from 'sharp';
const sharp = pkg;

export default async function handler(req, res) {
  // headers
  res.setHeader('Cache-Control', 'max-age=0, s-maxage=1800');
  res.setHeader('Content-Type', 'image/jpeg');
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"); 
  // get the image
  const { src, height, width, quality } = req.query;
	const imgSource = await fetch(src);
  const imgBuffer = Buffer.from(await imgSource.arrayBuffer())
  // convert
  const img = await sharp(imgBuffer)
  .resize(parseInt(width), parseInt(height), {fit: "contain"})
  .jpeg({ mozjpeg: true, quality: parseInt(quality) })
  .toBuffer();

  res.send(img);
}