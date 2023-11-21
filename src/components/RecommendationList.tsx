import { IDiscogsRelease } from '@/lib/utils/discogsUtils';
import Recommendation from '@/components/Recommendation';

type Props = {
  recommendations: IDiscogsRelease[];
};

const RecommendationList = ({ recommendations }: Props) => {
  return (
    <>
      {recommendations.map(recommendation => {
        const { id } = recommendation;

        return <Recommendation key={id} recommendation={recommendation} />;
      })}
    </>
  );
};
export default RecommendationList;
