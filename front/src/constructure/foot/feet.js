
import { Text, Image, Flex } from '@mantine/core'
import react_logo from '../../public/react_logo.svg'
import { useSelector} from 'react-redux';
import { useMediaQuery } from '@mantine/hooks';

const title = {
   'eng': [`Demir Bank (Digital transformation department) Tynystanova 105`],
   'ру': [`Демир Банк (Отдел цифровой трансформации) Тыныстанова 105`],
};

export default function Feet() {
   const matches = useMediaQuery('(min-width: 700px)')
   const currentLanguage = useSelector(state => state.reducer_1.language)
   return (
      <Flex align={'center'} justify={'space-between'}>
         <Text
            style={{ flexGrow: 8, textAlign: "center"}} size={'sm'}>{matches ? title[currentLanguage === 'ру' ? 'eng' : 'ру'][0] : title[currentLanguage === 'ру' ? 'eng' : 'ру'][1]}
         </Text>
         <Image width={40} height={40} src={react_logo} />
      </Flex>
   )
}