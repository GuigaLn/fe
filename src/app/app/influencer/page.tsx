import { influencerService } from "@/app/services/influencer";
import { DataTableInfluencers } from "./components/datatable-influencers";

export default async function InfluencerPage() {
  const influencer = await influencerService.findAll();

  return (
    <div>
      <DataTableInfluencers influencer={[]} />
    </div>
  );
}
