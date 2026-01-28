'use client'
import React, {useState} from 'react'
import Image from 'next/image'
import { FaArrowDown, FaArrowRight, FaSearch } from 'react-icons/fa'

const Faq = () => {
const [openItems, setOpenItems] = useState({});

const toggleItem = (index) => {
    setOpenItems((prev) => ({ ...prev, [index]: !prev[index] }))
}
const [search, setSearch] = useState('')

    const faqs = [
    {
       question: "What is the Minimum Balance?",
      answer:
        "The minimum balance varies by account type. For personal accounts, it’s typically $100, while corporate accounts may require $500.",
    },
    {
        
      question: "How do I open an account?",
      answer:
        "You can open an account online via our website or visit a branch with valid ID and proof of address.",
    },
    {
        
      question: "What are the fees involved?",
      answer: "Fees depend on the account type. Personal accounts have no monthly fees, while corporate accounts may incur a $10 monthly maintenance fee.",
    },
    {
        
      question: "Can I transfer money internationally?",
      answer:
        "Yes, international transfers are supported with a small fee based on the destination and amount.",
    },
    {
        
      question: "How secure is my account?",
      answer:
        "We use industry-standard encryption and two-factor authentication to ensure your account’s security.",
    },
  ];
  return (
    <div className='font-roboto'>
        <div className="bg-[var(--blue)] py-15">
            <h1 className='text-xl lg:text-4xl md:text-3xl font-bold text-center text-[var(--white)]'>Question & Answers</h1>
             <p className='text-xl lg:text-[17px] md:text-[15px] text-center text-[var(--white)]'>Find answers to all your queries about our service.</p>
            <div className="">
                <div className="grid grid-cols-1 md:grid-cols-2 py-3 items-center mx-10">
                    <div className="mt-20 ml-10">
                        <Image src="/faqs.png"
                        alt="Question image"
                        width={500}
                        height={500}
                        className='object-contain'
                        />
                    </div>
                    <div className="">
                        <div className=" relative w-[50%] flex items-center justify-between text-[var(--blue)] px-3 py-5 mt-5">
                            <input type="text"
                            placeholder='what are the requirement to fix my toilet'
                            value={search} 
                            onChange={(e)=>setSearch(e.target.value)}
                            className='w-full bg-[var(--white)] py-1 focus:outline-none focus:ring-2 focus:ring-[var(--orange)] focus:border-[var(--orange)] rounded-lg pr-7 pl-1' />
                            <FaSearch size={15} className='text-[var(--blue)] absolute right-5 top-1/2 -translate-y-1/2'/>
                        </div>
                        <div className="bg-[var(--white)] mx-3 py-4">
                            <h1 className='text-xl lg:text-2xl md:text-1xl font-bold text-center text-[var(--blue)] py-4 px-5'> Help You to Find</h1>
                            {faqs.map((faq, index)=>(
                               <div key={index} className="mx-4 py-2 ">
                                 <button type='button'
                                 className='flex items-center justify-between border-1 border-[var(--blue)] w-full py-2 px-4  '
                                onClick={()=>toggleItem(index)}
                                aria-expanded={!!openItems[index]}
                                aria-controls={`q${index}-content`}
                                >
                                     <p className='text-[var(--blue)] text-sm lg:text-xl md:text-1xl'>{faq.question}</p>
                                    {openItems[index] ? <FaArrowDown size={35} className='bg-[var(--blue)] border-2 border-[var(--orange)] text-[var(--white)] p-2 rounded-full'/> 
                                    : 
                                    <FaArrowRight size={35} className='bg-[var(--blue)] border-2 border-[var(--orange)] text-[var(--white)] p-2 rounded-full'/>}
                                   
                                </button>
                                {openItems[index] && (
                                    <div id={`q${index}-content`} className="">
                                        <p className='text-[var(--blue)] text-sm lg:text-xl md:text-1xl px-4'>{faq.answer}</p>
                                    </div>
                                )}
                               </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Faq