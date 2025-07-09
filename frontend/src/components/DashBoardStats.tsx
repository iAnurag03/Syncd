
import { Library, ListMusic, PlayCircle, Users2 } from "lucide-react";
import StatsCard from "./StatsCard";
import { useMusicStore } from "@/store/useMusicStore";

const DashboardStats = () => {
	const { stats } = useMusicStore();
	console.log(stats);

	const statsData = [
		{
			icon: ListMusic,
			label: "Total Songs",
			value: stats.totalSongs?.toString(),
			bgColor: "bg-red-400/10",
			iconColor: "text-red-300",
		},
		{
			icon: Library,
			label: "Total Albums",
			value: stats.totalAlbums?.toString(),
			bgColor: "bg-[#9DD9D2]/10",
			iconColor: "text-[#61C9A8]",
		},
		{
			icon: Users2,
			label: "Total Artists",
			value: stats.totalArtists?.toString(),
			bgColor: "bg-[#6CA6C1]/10",
			iconColor: "text-[#1A659E]",
		},
		{
			icon: PlayCircle,
			label: "Total Users",
			value: stats.totalUsers?.toLocaleString(),
			bgColor: "bg-[#ffff00]/10",
			iconColor: "text-yellow-200",
		},
	];

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 '>
			{statsData.map((stat) => (
				<StatsCard
					key={stat.label}
					icon={stat.icon}
					label={stat.label}
					value={stat.value}
					bgColor={stat.bgColor}
					iconColor={stat.iconColor}
				/>
			))}
		</div>
	);
};
export default DashboardStats;