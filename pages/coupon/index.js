import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import image from '../../public/coupon.svg'

import NavbarWithCookies from '@/components/Navbar'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useRouter } from 'next/router'
import { format, parseISO } from 'date-fns';


const coupon = () => {
  const router = useRouter()
  const { id } = router.query
  const [data, setData] = useState('');
  const [formattedDrDate, setFormattedDrDate] = useState('');
  


  useEffect(() => {
    if (id) {
      // fetch the record with the specified id from your server-side API endpoint
      axios.get('http://127.0.0.1:8000/form/' + id + '/', {
        headers: {
          Authorization: `Token ${Cookies.get('token')}`,
        },
      })
        .then(res => {
          setData(res.data);
          
        });
    }
  }, [id]);

  useEffect(() => {
    if (id && data.dr_date) {
      const drDate = parseISO(data.dr_date);
      const formattedDrDate = format(drDate, 'dd-MM-yyyy')
      setFormattedDrDate(formattedDrDate);
    }
  }, [id, data.dr_date]);

 
  const handlePrint = () => {
    window.print();
    router.push("/admin")
  };




  return <>
    
    <div className="no-print">
      <NavbarWithCookies />
    </div>


    <div id="printable-image" className=' mx-auto  w-[40rem] h-[30rem] mt-28 flex flex-col relative items-center justify-center '>
      <Image className='-rotate-90 w-[30rem] ' src={image} width={0} height={0} />
      <div className='absolute bottom-6 left-[4.5rem] text-center'>
        <div className=''>

          <h1 className='text-[#ff2e2d] text-xl font-bold'>{data.Token_id}</h1>
          <p className='text-[#ff2e2d] font-bold'>ड्रा दिनांक : {formattedDrDate}</p>
        </div>
      </div>

      <div className='absolute bottom-16 right-[4rem] text-center'>
        <div>
          <p className='text-[#ff2e2d] font-bold'>मो.नं.: {data.Mobile_No}</p>
        </div> <br></br>
        <div className=''>
          <h1 className='text-[#ff2e2d] text-xl font-bold'>{data.Token_id}</h1> <br></br>
          <p className='text-[#ff2e2d] font-bold'>ड्रा दिनांक : {formattedDrDate}</p>
        </div>
      </div>

    </div>

    <div className='mx-auto w-[40rem] mt-5 text-center pr-3'>
      <button className="print-btn rounded-md bg-green-600 hover:bg-green-800 px-5 py-2.5 text-sm font-medium text-white shadow"
        onClick={handlePrint}
      >
        Print
      </button>

    </div>

  </>
}

export default coupon