import { useEntryQuery } from "../rtk/API";
import { Badge, Divider, Card, Image, Text, Group } from "@mantine/core";
import uuid from "react-uuid";

export default function Entry() {
  const { data } = useEntryQuery();

  return (
    <>
      <Divider
        my="lg"
        color={"dark"}
        label={
          <Badge color={"dark"} variant="filled">
            Вводное
          </Badge>
        }
        labelPosition="center"
      />
      {data &&
        data.map((item, index) => (
          <Card key={uuid()} shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section key={uuid()}>
              <Image
                key={uuid()}
                src="https://play-lh.googleusercontent.com/bnh94yolrrxrrVQglNl1abEIh7Qc-cNA9XrVgDk1qBAzNEt6pCc3Fye5ot2Gi5n2-DY=w416-h235-rw"
                height={270}
                alt="DKIB"
              />
            </Card.Section>

            <Group key={uuid()} justify="space-between" mt="md" mb="xs">
              <Text key={uuid()} fw={500}>
                {item.name}
              </Text>
              <Badge key={uuid()} color="pink">
                DKIB
              </Badge>
            </Group>

            <Text key={uuid()} size="sm" c="dimmed">
              {item.description}
            </Text>
          </Card>
        ))}
    </>
  );
}
