import { Text, Image, Flex } from '@mantine/core';
import react_logo from '../../public/react_logo.svg';

export default function Feet() {
  return (
    <Flex align={'center'} justify={'space-between'}>
      <Text style={{ flexGrow: 8, textAlign: 'center' }} size={'sm'}>
        Dep - Analytics and DWH
      </Text>
      <Image width={40} height={40} src={react_logo} />
    </Flex>
  );
}
