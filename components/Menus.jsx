import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from './layouts/Header'
import Navbar from './layouts/Navbar'

export default function Menus() {

  const [menus, setMenus] = useState([])
  const [no, setNo] = useState('1')

  useEffect(() => {
    setInterval(() => {
      return setNo(Math.ceil(Math.random() * 5).toString())
    }, 3000)

    fetch('./piket.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => setMenus(res))
  }, [])

  return (
    <div>
      <Header />
      <div className='py-20 flex flex-col'>
        <div className="mb-5">
          <img src={`./slide/ramadhan${no}.jpg`} alt='slide' className='w-full rounded-lg shadow-lg' />
        </div>
        {
          menus.map(menu => {
            return (
              <div className="flex flex-col" key={menu.id}>
                <div className="w-full p-6 shadow-md rounded-lg flex justify-between items-center">
                  <h1 className="font-bold text-3xl text-[#f59800]">{menu.menu}</h1>
                  <img src={`./svg/navbar/${menu.icon}.svg`} alt="icon" className='w-8 h-8' />
                </div>
                <div className='mb-10 mt-6'>
                  {
                    menu.daftar.map(daf => {
                      return (
                        <Link to={`../menu/${daf.id}`} key={daf.id}>
                          <div className="p-3 pt-6 text-xl hover:bg-slate-50 rounded-lg hover:text-slate-800 text-[#f59800]">
                            <img src={`./svg/${daf.judul}.svg`} alt="icon" className='w-8  h-8 inline mr-3' />{daf.judul}
                          </div>
                          <hr className='border-b-1 mb-2 w-[98%] mx-auto border-slate-800 ' />
                        </Link>
                      )
                    })
                  }
                </div>
              </div>
            )
          })
        }
      </div>
      <Navbar />
    </div>
  )
}
