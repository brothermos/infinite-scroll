import { useState, useEffect, useRef } from "react";
import { Card, Text, Badge, Button } from "@mantine/core";

interface DataProps {
  id: number;
  description: string;
  url: string;
  types: string[];
  topics: string[];
  levels: Level[];
}

enum Level {
  Advanced = "advanced",
  Beginner = "beginner",
  Intermediate = "intermediate",
}

const MyComponent = () => {
  const [data, setData] = useState<DataProps[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const [displayedItems, setDisplayedItems] = useState<number>(4);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.sampleapis.com/codingresources/codingResources`);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (
        containerRef.current &&
        containerRef.current.scrollTop + 100 + containerRef.current.clientHeight >= containerRef.current.scrollHeight
      ) {
        setDisplayedItems((prevCount) => prevCount + 4);
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className=" container mx-auto px-4 max-h-[800px] py-20" ref={containerRef} style={{ overflowY: "scroll" }}>
      <div className="grid grid-cols-4 grid-rows-2 gap-8">
        {data.slice(0, displayedItems).map((item) => (
          <Card shadow="md" padding="lg" radius="lg" withBorder key={item?.id}>
            <div className="flex flex-col gap-4">
              <div className=" font-bold h-[50px]">{item?.description}</div>
              <Badge style={{ maxWidth: "100%" }} color="yellow">
                {item?.topics?.join(", ")}
              </Badge>
            </div>

            <Text size="md" c="dimmed" style={{ marginTop: "16px" }}>
              With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and
              around the fjords of Norway
            </Text>
            <Badge color="red" variant="light" style={{ marginTop: "16px" }}>
              {item?.levels?.join(", ")}
            </Badge>
            <Button variant="gradient" gradient={{ from: "grape", to: "blue", deg: 90 }} fullWidth mt="lg" radius="md">
              Read more..
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyComponent;
