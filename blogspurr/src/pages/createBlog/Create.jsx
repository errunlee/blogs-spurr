

import React from 'react'
import TinyMCE from '../../components/Blogform/TinyMCE'
import { motion } from 'framer-motion'
const Create = () => {
  const childVariants = {
    initial: {
      opacity: 0
    },
    final: {
      opacity: 1,
      transition: {
        // delay: 1
      }
    }
  }
  return (
    <div className='p-3 flex gap-2'>
      <motion.div
        variants={childVariants}
        initial='initial'
        animate='final'
      >
        <TinyMCE />
      </motion.div>
    </div>
  )
}

export default Create