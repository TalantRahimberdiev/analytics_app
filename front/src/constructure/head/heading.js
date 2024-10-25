
import { MediaQuery,Burger, ActionIcon, useMantineTheme, useMantineColorScheme,Image, } from "@mantine/core"
import DarkLight from "./darkLight"
import { useMediaQuery } from '@mantine/hooks';
import { useSelector, useDispatch } from 'react-redux';
import { changeBurger, changeLanguage } from '../../rtk/slice_1';
import logo from '../../public/logo.png'

const title = {
   'eng': [`Competitor Tariff Data Entry`],
   'ру': [`Ввод данных о тарифах конкурентов`],
};


export default function Heading() {

   const theme = useMantineTheme()
   const matches = useMediaQuery('(min-width: 700px)')
   const { colorScheme } = useMantineColorScheme()
   const dark = colorScheme === 'dark'
   const currentLanguage = useSelector(state => state.reducer_1.language)
   const dispatch = useDispatch()
   const opened = useSelector(state => state.reducer_1.opened)

   return (
      <div style={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'space-around' }}>

         <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Burger opened={opened} onClick={() => dispatch(changeBurger())} size="sm" color={theme.colors.gray[6]} mr={'5px'} />
         </MediaQuery>

         <Image width={50} height={50} src={logo} alt="logo" />

         <h4
            style={{ flexGrow: 8, textAlign: "center", color: dark ? 'white' : 'black' }} size={'sm'}>{matches ? title[currentLanguage === 'ру' ? 'eng' : 'ру'][0] : title[currentLanguage === 'ру' ? 'eng' : 'ру'][1]}
         </h4>

         <ActionIcon
            style={{ flexGrow: 0, marginRight: '13px', width: '37px' }} variant="outline" color={dark ? 'yellow' : 'dark'} onClick={() => dispatch(changeLanguage())}>{currentLanguage}
         </ActionIcon>

         <DarkLight style={{ flexGrow: 0 }} />
      </div>
   )
}