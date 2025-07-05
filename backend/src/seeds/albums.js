import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { config } from "dotenv";

config();

const seedDatabase = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);

		// Clear existing data
		await Album.deleteMany({});
		await Song.deleteMany({});

		// First, create all songs
		const createdSongs = await Song.insertMany([
			{
				title: "City Rain",
				artist: "Urban Echo",
				imageUrl: "/cover-images/1.jpg",
				audioUrl: "/songs/1.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 15, 
			},
			{
				title: "Neon Lights",
				artist: "Night Runners",
				imageUrl: "/cover-images/2.jpg",
				audioUrl: "/songs/2.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 15, 
			},
			{
				title: "Urban Jungle",
				artist: "City Lights",
				imageUrl: "/cover-images/3.jpg",
				audioUrl: "/songs/3.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 18,
			},
			{
				title: "Neon Dreams",
				artist: "Cyber Pulse",
				imageUrl: "/cover-images/4.jpg",
				audioUrl: "/songs/4.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 16, 
			},
			{
				title: "Summer Daze",
				artist: "Coastal Kids",
				imageUrl: "/cover-images/5.jpg",
				audioUrl: "/songs/5.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 18, 
			},
			{
				title: "Ocean Waves",
				artist: "Coastal Drift",
				imageUrl: "/cover-images/6.jpg",
				audioUrl: "/songs/6.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 22, 
			},
			{
				title: "Crystal Rain",
				artist: "Echo Valley",
				imageUrl: "/cover-images/7.jpg",
				audioUrl: "/songs/7.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 14,
			},
			{
				title: "Starlight",
				artist: "Luna Bay",
				imageUrl: "/cover-images/8.jpg",
				audioUrl: "/songs/8.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 19, 
			},
			{
				title: "Stay With Me",
				artist: "Sarah Mitchell",
				imageUrl: "/cover-images/9.jpg",
				audioUrl: "/songs/9.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 13,
			},
			{
				title: "Midnight Drive",
				artist: "The Wanderers",
				imageUrl: "/cover-images/10.jpg",
				audioUrl: "/songs/10.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 15, 
			},
			{
				title: "Moonlight Dance",
				artist: "Silver Shadows",
				imageUrl: "/cover-images/11.jpg",
				audioUrl: "/songs/11.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 10, 
			},
			{
				title: "Lost in Tokyo",
				artist: "Electric Dreams",
				imageUrl: "/cover-images/12.jpg",
				audioUrl: "/songs/12.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 13
			},
			{
				title: "Neon Tokyo",
				artist: "Future Pulse",
				imageUrl: "/cover-images/13.jpg",
				audioUrl: "/songs/1.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 15
			},
			{
				title: "Purple Sunset",
				artist: "Dream Valley",
				imageUrl: "/cover-images/14.jpg",
				audioUrl: "/songs/2.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 15
			},
		]);

		// Create albums with references to song IDs
		const albums = [
			{
				title: "Urban Nights",
				artist: "Various Artists",
				imageUrl: "/albums/1.jpg",
				releaseYear: 2023,
				songs: createdSongs.slice(0, 4).map((song) => song._id),
			},
			{
				title: "Coastal Dreaming",
				artist: "Various Artists",
				imageUrl: "/albums/2.jpg",
				releaseYear: 2025,
				songs: createdSongs.slice(4, 8).map((song) => song._id),
			},
			{
				title: "Midnight Sessions",
				artist: "Various Artists",
				imageUrl: "/albums/3.jpg",
				releaseYear: 2024,
				songs: createdSongs.slice(9, 12).map((song) => song._id),
			},
			{
				title: "Eastern Dreams",
				artist: "Various Artists",
				imageUrl: "/albums/4.jpg",
				releaseYear: 2024,
				songs: createdSongs.slice(11, 14).map((song) => song._id),
			},
		];

		// Insert all albums
		const createdAlbums = await Album.insertMany(albums);

		// Update songs with their album references
		for (let i = 0; i < createdAlbums.length; i++) {
			const album = createdAlbums[i];
			const albumSongs = albums[i].songs;

			await Song.updateMany({ _id: { $in: albumSongs } }, { albumId: album._id });
		}

		console.log("Database seeded successfully!");
	} catch (error) {
		console.error("Error seeding database:", error);
	} finally {
		mongoose.connection.close();
	}
};

seedDatabase();