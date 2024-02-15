import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

function SkeletonBody() {
  return (
    <Box className="grid grid-cols-1 md:grid-cols-4 gap-8 m-8">
      {Array.from(new Array(4)).map((_item, index) => (
        <Box key={index} sx={{ width: 250, marginRight: 0.5, my: 5 }}>
          <Skeleton variant="rectangular" width={250} height={250} />
          <Box sx={{ pt: 0.5 }}>
            <Skeleton />
            <Skeleton width="60%" />
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default function LoadingSkeleton() {
  return (
    <Box sx={{ overflow: "hidden" }}>
      <SkeletonBody />
      <SkeletonBody />
    </Box>
  );
}
