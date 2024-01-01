import React, { useState } from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { useTranslation } from 'react-i18next'
import './App.css'
import axios from "axios";
import {
  ThemeProvider,
  CssBaseline,
  IconButton,
  Box,
  Typography,
  Button
} from "@mui/material";

import { lightTheme, darkTheme } from "./theme/theme";
import Card1 from "./components/Card1";
import Card2 from "./components/Card2";
import Card3 from "./components/Card3";

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import './style.css';

// import required modules
import { Navigation } from 'swiper/modules';
import Card4 from "./components/Card4";

import { useEffect } from 'react';
import { TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


// table =
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

//Table 
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const api = "http://localhost:3000/data"


const App = () => {

  //Light Dark Mode
  const storedTheme = localStorage.getItem("lightMode");

  const [lightMode, setLightMode] = useState(storedTheme == true);

  const toggleLightMode = () => {
    const newLightMode = !lightMode;

    setLightMode(newLightMode); //
    localStorage.setItem("lightMode", newLightMode);
  };

  const theme = lightMode ? lightTheme : darkTheme;

  //Translate 
  const [lng, setImg] = useState("en")

  const { t, i18n } = useTranslation()

  const changeLanguage = (language) => {
    i18n.changeLanguage(language)
  }


  //modal 
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //modal  add
  const [openAdd, setOpenAdd] = useState(false);

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };


  const [todo, setTodo] = useState([])
  const [addName, setAddName] = useState("")
  const [addCity, setAddCity] = useState("")
  const [addNumber, setAddNumber] = useState("")

  const [editName, setEditName] = useState("")
  const [editCity, setEditCity] = useState("")
  const [editNumber, setEditNumber] = useState("")
  // const [editStatus, setEditStatus] = useState("")
  const [idx, setIdx] = useState(null)


  async function get() {
    try {
      let { data } = await axios.get(api)
      setTodo(data)
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    get()
  }, [])

  async function deleteUser(id) {
    try {
      let { data } = await axios.delete(`${api}/${id}`)
      get()
    } catch (error) {
      console.log(error);
    }
  }

  async function editUser(id, user) {
    try {
      let { data } = await axios.put(`${api}/${id}`, user);
      get()
    } catch (error) {
      console.log(error);
    }
  }

  async function addUser(user) {
    try {
      let { data } = await axios.post(api, user)
      get()
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ThemeProvider theme={theme}>

        {/* header */}
        <header className="lg:py-[30px] sm:py-[20px] sm:px-[5px]" id="bg">
          <nav className="bg-[#201f1f28] flex items-center lg:w-[80%] p-[5px] nav m-[auto] justify-around">
            <img src="src/assets/navImg/Снимок экрана 2023-08-10 в 22.08.08-PhotoRoom 2.png" alt="" />
            <Box className="lg:flex items-center gap-[20px] sm:hidden">
              <Typography>{t("p1nav")}</Typography>
              <Typography>{t("p2nav")}</Typography>
              <Typography>{t("p3nav")}</Typography>
              <Typography>{t("p4nav")}</Typography>
            </Box>
            <Box className="lg:flex items-center gap-[25px] sm:hidden">
              <Typography>+7 (999)-999-99-99</Typography>
              <Typography>test@mail.ru</Typography>
            </Box>
            <button className="lg:block sm:hidden" id="btn">{t("btn1")}</button>
            <CssBaseline />
            <IconButton onClick={toggleLightMode} color="inherit">
              <Brightness4Icon />
            </IconButton>
            <select name="" id="" className='rounded-[10px] bg-[#2a7382] p-[5px] text-[18px]'
              value={lng}
              onChange={(e) => {
                changeLanguage(e.target.value)
                setImg(e.target.value)
              }}
            >
              <option value="en">En</option>
              <option value="ru">Ru</option>
              <option value="tj">TJ</option>
            </select>
          </nav>

          {/* aside */}
          <aside className="lg:pr-[378px] lg:pl-[175px] lg:pt-[224px] flex flex-col items-start lg:gap-[30px] sm:gap-[15px] sm:py-[90px]">
            <h4 className="lg:text-[24px] sm:text-[15px] uppercase font-[500]">{t("p5sec1")}</h4>
            <h1 className="lg:text-[60px] uppercase sm:text-[22px] font-[500]">{t("h1p")}</h1>
            <p className="text-[#A1A1AA] lg:w-[511px] leading-[28px] sm:text-[14px] lg:text-[18px]">{t("p6")}</p>
            <Box className="flex items-center gap-[20px] sm:flex-wrap">
              <button id="btn2" className="px-[52px] py-[15px]">{t("btn1")}</button>
              <Box className="flex w-[390px] items-center gap-[10px] py-[17px] px-[16px]" id="d1">
                <img src="src/assets/navImg/search.png" />
                <input type="text" className="rounded-[60px] bg-[#80808000] w-[385px] px-[5px]" placeholder={t("place")} />
              </Box>
            </Box>
          </aside>
          <Box className="flex flex-col gap-[15px] lg:px-[176px] lg:py-[43px] sm:px-[14px] sm:py-[24px]">
            <Box className="flex items-center gap-[10px]">
              <img src="src/assets/main/sec1/Next page.png" alt="" />
              <img src="src/assets/main/sec1/Next page (1).png" alt="" />
            </Box>
            <img src="src/assets/main/sec1/Frame 63.png" className="w-[100%]" />
          </Box>
        </header>


        {/* main */}
        <main>

          {/* section */}
          <section>
            <Box className="flex flex-col gap-[10px] lg:px-[176px] lg:py-[50px] sm:px-[14px] sm:py-[24px]">
              <hr />
              <div className="flex justify-between">
                <p>01</p>
                <img src="src/assets/main/sec1/Ellipse 37.png" alt="" />
              </div>
            </Box>

            <aside className="lg:px-[176px] lg:py-[50px] sm:px-[14px] sm:py-[24px]">
              <p className="text-[16px] tracking-[1.6px]">{t("span")}</p>
              <h1 className="lg:text-[60px] sm:text-[39px] uppercase">{t("h1s")} <p className="text-[#848484]">{t("h2p")} <span className="text-[#6DDCFF]">{t("h3p")}</span></p></h1>
            </aside>

            <Box className="flex flex-wrap lg:pl-[176px] lg:py-[50px] sm:px-[14px] sm:py-[24px] gap-[21px]">
              <p className="lg:w-[277px]">{t("lorem")}</p>
              <div className="bg1 w-[390px]"><Card1 img={"src/assets/card1/Intersect.png"} h1={t("card1h1")} p={t("card1p")} /></div>
              <div className="bg2 w-[390px]"><Card1 img={"src/assets/card1/Intersect (1).png"} h1={t("card1h1")} p={t("card1p")} /></div>
              <div className="bg2 w-[390px]"><Card1 img={"src/assets/card1/Intersect (2).png"} h1={t("card1h1")} p={t("card1p")} /></div>
              <div className="bg1 w-[390px]"><Card1 img={"src/assets/card1/Intersect (3).png"} h1={t("card1h1")} p={t("card1p")} /></div>
              <div className="bg3 w-[390px]"><Card1 img={"src/assets/card1/Intersect (4).png"} h1={t("card1h1")} p={t("card1p")} /></div>
            </Box>
          </section>

          {/* section 2 */}
          <section className="lg:pt-[128px] sm:py-[60px]">
            <Box className="flex flex-col gap-[10px] lg:px-[176px] lg:py-[20px] sm:px-[14px] sm:py-[24px]">
              <hr />
              <div className="flex justify-between">
                <p>02</p>
                <img src="src/assets/main/sec1/Ellipse 37.png" alt="" />
              </div>
            </Box>

            <aside className="lg:px-[176px] lg:py-[50px] sm:px-[14px] sm:py-[24px]">
              <p className="text-[16px] tracking-[1.6px]">{t("span2")}</p>
              <h1 className="lg:text-[60px] sm:text-[39px] uppercase">{t("sec2h1")} <p><span className="text-[#6DDCFF]">{t("sec2p")}</span> {t("sec1span")}</p></h1>
              <p className="lg:w-[480px] text-[#848484]">{t("lorem")}</p>
            </aside>
            <div className="flex div1 "><h1 className="h1 ">#корпоративный</h1>
              <h1 className="h1">секто</h1>
            </div>
            <div className="flex div1"><h1 className="h1">ртивныезалы </h1>
              <h1 className="h1">#медици</h1>
            </div>

            <div className="flex div1"><h1 className="h1">ыйсектор </h1>
              <h1 className="h1">#государств</h1>
            </div>
          </section>

          {/* section */}
          <section>
            <Box className="flex flex-col gap-[10px] lg:px-[176px] sm:px-[14px]">
              <hr />
              <div className="flex justify-between">
                <p>04</p>
                <img src="src/assets/main/sec1/Ellipse 37.png" alt="" />
              </div>
            </Box>

            <aside className="lg:px-[176px] lg:py-[50px] sm:px-[14px] sm:py-[24px]">
              <p className="text-[16px] tracking-[1.6px]">{t("span3")}</p>
              <h1 className="lg:text-[60px] sm:text-[39px] uppercase">{t("h1sec4")} </h1>
              <span className="text-[#6DDCFF] lg:text-[60px] sm:text-[39px] uppercase">{t("h2sec4")}</span>
              <p className="lg:text-[60px] sm:text-[39px] uppercase">{t("h3sec4")}</p>
            </aside>

            <Box className="flex flex-wrap lg:pl-[176px] lg:py-[50px] sm:px-[14px] sm:py-[24px] gap-[21px] items-start">
              <p className="lg:w-[277px]">{t("lorem")}</p>
              <div className="text-[24px]"><Card2 img={"src/assets/card2/Group 65 (1).png"} h1={t('h1card2')} ig={"src/assets/card2/Rectangle 80.png"} st={"src/assets/card2/Upward Arrow.png"} /></div>
              <div className="text-[24px]"><Card2 img={"src/assets/card2/Group 67.png"} h1={t('h2card2')} ig={"src/assets/card2/Rectangle 80.png"} st={"src/assets/card2/Upward Arrow.png"} /></div>
              <div className="text-[24px]"><Card2 img={"src/assets/card2/Rectangle 82.png"} h1={t('h3card2')} ig={"src/assets/card2/Rectangle 80.png"} st={"src/assets/card2/Upward Arrow.png"} /></div>
              <div className="text-[24px]"><Card2 img={"src/assets/card2/Rectangle 67.png"} h1={t('h4card2')} ig={"src/assets/card2/Rectangle 80.png"} st={"src/assets/card2/Upward Arrow.png"} /></div>
              <div className="card2d px-[20px] lg:w-[320px] md:w-[320px]"><Card2 h1={t('h5card2')} ig={"src/assets/card2/Rectangle 80.png"} /></div>
            </Box>
          </section>


          {/* section */}
          <section>
            <Box className="flex flex-col gap-[10px] lg:py-[130px] sm:py-[60px] lg:px-[176px] sm:px-[14px]">
              <hr />
              <div className="flex justify-between">
                <p>04</p>
                <img src="src/assets/main/sec1/Ellipse 37.png" alt="" />
              </div>
            </Box>

            <Box className="lg:px-[176px] lg:py-[50px] sm:px-[14px] sm:py-[24px] flex justify-between sm:gap-[40px] items-center sm:flex-wrap">
              {/* left */}
              <aside className="flex items-center gap-[15px] sm:overflow-hidden">
                <div className="w-[200px] djk px-[19px] py-[17px]"><Card3 h1={t("t1")} p={t("t2")} img={"src/assets/card3/Calendar (1).png"} /></div>
                <div className="w-[200px] djk1 px-[19px] py-[17px]"><Card3 h1={t("t1")} p={t("t2")} img={"src/assets/card3/Toolbox.png"} /></div>
                <div className="w-[200px] djk2 px-[19px] py-[17px]"><Card3 h1={t("t3")} p={t("t4")} img={"src/assets/card3/Handshake.png"} /></div>
              </aside>


              {/* right */}
              <aside>
                <h1 className="lg:text-[60px] sm:text-[39px] uppercase">{t("comp")}</h1>
                <div className="lg:w-[455px] md:w-[455px] flex flex-col gap-[20px] text-[#868585b5]">
                  <p>{t("v1")}</p>
                  <p>{t("v2")}</p>
                </div>
              </aside>
            </Box>

          </section>

          <section className='lg:px-[120px] lg:py-[80px]'>
            <button className='bg-[hsl(186,43%,23%)] py-[5px] px-[15px] rounded-[5px] text-white ml-[30px]' onClick={() => { handleClickOpenAdd() }}>New +</button>
            {/* table */}
            <TableContainer sx={{ width: "95%", margin: "0 auto", paddingBottom: "50px", paddingTop: "10px" }}>
              <Table sx={{ minWidth: 400 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="right" sx={{ textAlign: "center" }}>Name</StyledTableCell>
                    <StyledTableCell align="right" sx={{ textAlign: "center" }}>City</StyledTableCell>
                    <StyledTableCell align="right" sx={{ textAlign: "center" }}>Phone</StyledTableCell>
                    <StyledTableCell align="right" sx={{ textAlign: "center" }}>Remove</StyledTableCell>
                    <StyledTableCell align="right" sx={{ textAlign: "center" }}>Edit</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {todo.map((e) => (
                    <StyledTableRow>
                      <StyledTableCell align="right" sx={{ textAlign: "center" }}>{e.name}</StyledTableCell>
                      <StyledTableCell align="right" sx={{ textAlign: "center" }}>{e.city}</StyledTableCell>
                      <StyledTableCell align="right" sx={{ textAlign: "center" }}>{e.number}</StyledTableCell>
                      <StyledTableCell align="right" sx={{ textAlign: "center" }}><button className='bg-[red] px-[25px] text-[white] p-[8px] rounded-[10px]' onClick={() => deleteUser(e.id)}>Delete</button></StyledTableCell>
                      <StyledTableCell align="right" sx={{ textAlign: "center" }}><button className='bg-[green] px-[20px] text-[white] p-[8px] rounded-[10px]' onClick={() => {
                        handleClickOpen()
                        setIdx(e.id)
                        setEditName(e.name)
                        setEditCity(e.city)
                        setEditNumber(e.number)
                      }}>Edit</button></StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </section>

          {/* section */}
          <section>
            <Box className="flex flex-col gap-[10px] lg:py-[130px] sm:py-[60px] lg:px-[176px] sm:px-[14px]">
              <hr />
              <div className="flex justify-between">
                <p>05</p>
                <img src="src/assets/main/sec1/Ellipse 37.png" alt="" />
              </div>
            </Box>

            <Box className="flex justify-between">
              <aside className="relative">
                <aside className="lg:px-[176px] lg:py-[50px] sm:pl-[10px] sm:py-[24px]">
                  <h1 className="lg:text-[60px] sm:text-[32px] uppercase">{t("v3")} </h1>
                  <h1 className="lg:text-[60px] sm:text-[32px] uppercase">{t("v31")} <span className="text-[#6DDCFF] lg:text-[60px] sm:text-[39px] uppercase">{t("v4")}</span></h1>
                  <p className="text-[#6DDCFF] lg:text-[60px] sm:text-[32px] uppercase">{t("v41")} <span className="lg:text-[60px] text-[#b8b7b7] sm:text-[39px] uppercase">{t("v5")}</span></p>
                  <Box className="flex w-[390px] items-center gap-[10px] py-[17px] px-[16px] mt-[30px]" id="d1">
                    <h1 className="text-[24px] font-[800]">14</h1>
                    <input type="text" className="rounded-[60px] bg-[#80808000] w-[385px] px-[5px]" placeholder={t("v6")} />
                  </Box>
                </aside>
              </aside>

              <aside>
                <img src="src/assets/main/sec4/image 37.png" className="absolute right-[0.1%] z-[-1]" />
                <img src="src/assets/main/sec4/Mask group (5).png" className="absolute  right-[61%] z-[-1] mt-[310px] lg:block sm:hidden" />
                <img src="src/assets/main/sec4/Mask group (5).png" className="absolute  right-[58%] z-[-1] mt-[350px] lg:block sm:hidden" />
                <img src="src/assets/main/sec4/Mask group (5).png" className="absolute  right-[50%] z-[-1] mt-[400px] lg:block sm:hidden" />
                <img src="src/assets/main/sec4/Mask group (5).png" className="absolute  right-[40%] z-[-1] mt-[420px] lg:block sm:hidden" />
                <img src="src/assets/main/sec4/Mask group (5).png" className="absolute  right-[32%] z-[-1] mt-[500px] lg:block sm:hidden" />
                <img src="src/assets/main/sec4/Mask group (5).png" className="absolute  right-[22%] z-[-1] mt-[520px] lg:block sm:hidden" />
              </aside>
            </Box>
          </section>


          {/* section */}
          <section className="lg:py-[180px] lg:px-[176px]">
            <Box className="flex flex-col gap-[10px] lg:py-[130px] sm:py-[60px] sm:px-[14px]">
              <hr />
              <div className="flex justify-between">
                <p>06</p>
                <img src="src/assets/main/sec1/Ellipse 37.png" alt="" />
              </div>
            </Box>

            <aside className="sm:px-[14px] sm:py-[24px]">
              <p className="text-[16px] tracking-[1.6px]">{t("v8")}</p>
              <span className="text-[#6DDCFF] lg:text-[60px] sm:text-[39px] uppercase">{t("v9")}</span>
              <p className="lg:text-[60px] sm:text-[39px] uppercase">{t("v10")}</p>
            </aside>

            <Box className="lg:flex items-center gap-[14px] sm:hidden">
              <Card4 img={"src/assets/card4/Mask group (6).png"} p={t("v11")} />
              <Card4 img={"src/assets/card4/Mask group (6).png"} p={t("v11")} />
              <Card4 img={"src/assets/card4/Mask group (6).png"} p={t("v11")} />
              <Card4 img={"src/assets/card4/Mask group (6).png"} p={t("v11")} />
            </Box>

            <Box className="sm:px-[15px] lg:hidden sm:block">
              <Swiper navigation={true} modules={[Navigation]} className="mySwiper rounded-[10px]">
                <SwiperSlide><div className="mx-[50px] my-[12px]"><Card4 img={"src/assets/card4/Mask group (6).png"} p={t("v11")} /></div></SwiperSlide>
                <SwiperSlide><div className="mx-[50px] my-[12px]"><Card4 img={"src/assets/card4/Mask group (6).png"} p={t("v11")} /></div></SwiperSlide>
                <SwiperSlide><div className="mx-[50px] my-[12px]"><Card4 img={"src/assets/card4/Mask group (6).png"} p={t("v11")} /></div></SwiperSlide>
                <SwiperSlide><div className="mx-[50px] my-[12px]"><Card4 img={"src/assets/card4/Mask group (6).png"} p={t("v11")} /></div></SwiperSlide>
              </Swiper>

            </Box>
          </section>


          <section className="lg:px-[176px] lg:pb-[100px]">
            <Box className="flex flex-col gap-[10px] lg:pt-[10px] sm:py-[60px] sm:px-[14px]">
              <hr />
              <div className="flex justify-between">
                <p>07</p>
                <img src="src/assets/main/sec1/Ellipse 37.png" alt="" />
              </div>
            </Box>
            <p className="lg:text-[60px] sm:text-[39px] uppercase sm:px-[15px]">{t("v12")}</p>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper lg:w-[50%] rounded-[25px] lg:m-[auto] sm:mx-[15px]">
              <SwiperSlide><div className="p-[25px]"><img src="src/assets/card4/Rectangle 92.png" alt="" /></div></SwiperSlide>
              <SwiperSlide><div className="p-[25px]"><img src="src/assets/card4/Rectangle 92.png" alt="" /></div></SwiperSlide>
              <SwiperSlide><div className="p-[25px]"><img src="src/assets/card4/Rectangle 92.png" alt="" /></div></SwiperSlide>
              <SwiperSlide><div className="p-[25px]"><img src="src/assets/card4/Rectangle 92.png" alt="" /></div></SwiperSlide>
              <SwiperSlide><div className="p-[25px]"><img src="src/assets/card4/Rectangle 92.png" alt="" /></div></SwiperSlide>
              <SwiperSlide><div className="p-[25px]"><img src="src/assets/card4/Rectangle 92.png" alt="" /></div></SwiperSlide>
              <SwiperSlide><div className="p-[25px]"><img src="src/assets/card4/Rectangle 92.png" alt="" /></div></SwiperSlide>
            </Swiper>
          </section>

          {/* section */}
          <section className="sec lg:py-[72px] lg:px-[126px] lg:pb-[127px] sm:px-[12px] sm:py-[30px] sm:mt-[50px]">
            <Box className="flex flex-col gap-[10px] sm:px-[14px]">
              <hr />
              <div className="flex justify-between">
                <p>08</p>
                <img src="src/assets/main/sec1/Ellipse 37.png" alt="" />
              </div>
            </Box>

            <Box className="flex py-[29px] justify-between items-end sm:flex-wrap">
              <aside>
                <h1 className="lg:text-[60px]  sm:text-[32px] uppercase">{t("jk1")}</h1>
                <h1 className="lg:text-[60px]  sm:text-[32px] uppercase">{t("jk2")}</h1>
                <p className="lg:w-[420px] text-[#F5F5F5]">{t("jk3")}</p>
              </aside>
              <aside>
                <div className="form p-[25px] lg:w-[515px] md:w-[515px] flex flex-col items-start gap-[35px]">
                  <div className="flex flex-col items-center gap-[15px]">
                    <input type="text" placeholder={t("jk4")} className="rounded-[7px] border-[1px] py-[5px] pl-[15px] lg:pr-[200px] bg-[#ff000000] border-[#FFF] opacity-[0.2]" />
                    <input type="text" placeholder={t("jk5")} className="rounded-[7px] border-[1px] py-[5px] pl-[15px] lg:pr-[200px] bg-[#ff000000] border-[#FFF] opacity-[0.2]" />
                    <input type="text" placeholder={t("jk6")} className="rounded-[7px] border-[1px] py-[5px] pl-[15px] lg:pr-[200px] bg-[#ff000000] border-[#FFF] opacity-[0.2]" />
                  </div>
                  <div className="flex flex-col gap-[10px] items-start">
                    <p className="lg:w-[300px]">{t("jk7")}</p>
                    <button className="border-[1px] bg-[#ffffff00] px-[12px] py-[10px] rounded-[15px]" >{t("jk8")}</button>
                  </div>
                  <div className="flex items-center gap-[20px] sm:flex-wrap">
                    <button className="bg-[#6DDCFF] px-[25px] py-[15px] rounded-[15px]" >{t("jk9")}</button>
                    <p className="lg:w-[230px] text-[12px]">{t("jk10")}</p>
                  </div>
                </div>
              </aside>
            </Box>
          </section>


        </main>


        {/* footer */}
        <footer className="lg:py-[69px] lg:px-[159px] sm:px-[15px] sm:py-[40px]">
          <Box className="flex flex-col gap-[10px] sm:px-[14px]">
            <hr />
            <div className="flex justify-end">
              <img src="src/assets/main/sec1/Ellipse 37.png" alt="" />
            </div>
          </Box>
          <img src="src/assets/footer/Group 91.png" alt="" />

          {/* aside */}
          <aside className="py-[45px] flex items-start lg:flex-nowrap lg:gap-[130px] sm:flex-wrap sm:gap-[20px]">
            {/* ul */}
            <ul className="flex flex-col items-start gap-[15px] uppercase">
              <li>{t("rm3")}</li>
              <li>{t("r1")}</li>
              <li>{t("r2")}</li>
            </ul>

            {/* ul1 */}
            <ul className="lg:flex sm:hidden flex-col items-start gap-[15px] text-[14px] lg:w-[199px]">
              <li className="uppercase text-[16px]">{t("rm2")}</li>
              <li className="text-[#888888]">{t("r3")}</li>
              <li className="text-[#888888]">{t("r4")}</li>
              <li className="text-[#888888]">{t("r5")}</li>
              <li className="text-[#888888]">{t("r6")}</li>
              <li className="text-[#888888]">{t("r7")}</li>
              <li className="text-[#888888]">{t("r8")}</li>
              <li className="text-[#888888]">{t("r9")}</li>
              <li className="text-[#888888]">{t("r10")}</li>
              <li className="text-[#888888]">{t("r11")}</li>
              <li className="text-[#888888]">{t("r12")}</li>
            </ul>


            {/* ul */}
            <ul className="flex lg:flex sm:hidden  flex-col items-start gap-[15px] text-[14px] lg:w-[199px]">
              <li className="uppercase text-[16px]">{t("rm1")}</li>
              <li className="text-[#888888]">{t("l1")}</li>
              <li className="text-[#888888]">{t("l2")}</li>
              <li className="text-[#888888]">{t("l3")}</li>
              <li className="text-[#888888]">{t("l4")}</li>
              <li className="text-[#888888]">{t("l5")}</li>
              <li className="text-[#888888]">{t("l6")}</li>
              <li className="text-[#888888]">{t("l7")}</li>
              <li className="text-[#888888]">{t("l8")}</li>
              <li className="text-[#888888]">{t("l9")}</li>
              <li className="text-[#888888]">{t("l10")}</li>
              <li className="text-[#888888]">{t("l11")}</li>
              <li className="text-[#888888]">{t("l12")}</li>
            </ul>

            {/* ul */}
            <ul className="flex flex-col items-start gap-[28px]">
              <li>+7 (999)-999-99-99</li>
              <li>test@mail.ru</li>
              <div className="flex items-center gap-[10px]">
                <img src="src/assets/footer/Telegram App.png" alt="" />
                <img src="src/assets/footer/WhatsApp.png" alt="" />
                <img src="src/assets/footer/YouTube (1).png" alt="" />
              </div>
              <li>{t("li7")}</li>
              <li>{t("li1")}</li>
              <button className="border-[1px] bg-[#ffffff00] px-[12px] py-[10px] rounded-[15px]" >{t("btn2")}</button>
            </ul>
          </aside>
          <div className="text-[#888888] flex justify-between items-center text-[12px] pt-[10px]">
            <p>{t("end1")}</p>
            <p>{t("end2")}</p>
          </div>
        </footer>
      </ThemeProvider>



      {/* //modal */}
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Edit User"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ display: "flex", flexDirection: "column", gap: "30px" }} id="alert-dialog-description">
              <TextField value={editName} onChange={(e) => setEditName(e.target.value)} ></TextField>
              <TextField value={editNumber} onChange={(e) => setEditNumber(e.target.value)}></TextField>
              <TextField value={editCity} onChange={(e) => setEditCity(e.target.value)}></TextField>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Concel</Button>
            <Button onClick={() => {
              let obj = {
                name: editName,
                number: editNumber,
                city: editCity
              }
              console.log(editNumber);
              editUser(idx, obj)
              handleClose()
            }}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>



      {/* modal add */}
      {/* //modal */}
      <React.Fragment>
        <Dialog
          open={openAdd}
          onClose={handleCloseAdd}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Add User"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ display: "flex", flexDirection: "column", gap: "30px" }} id="alert-dialog-description">
              <TextField value={addName} onChange={(e) => setAddName(e.target.value)} ></TextField>
              <TextField value={addNumber} onChange={(e) => setAddNumber(e.target.value)}></TextField>
              <TextField value={addCity} onChange={(e) => setAddCity(e.target.value)}></TextField>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAdd}>Concel</Button>
            <Button onClick={() => {
              let user = {
                name: addName,
                city: addCity,
                number: addNumber,
              }
              setAddName("")
              setAddCity("")
              setAddNumber("")
              addUser(user)
              handleCloseAdd()
            }}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>

    </>

  );
};

export default App;