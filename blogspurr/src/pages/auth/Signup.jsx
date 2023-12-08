

import React from 'react'
import Register from '../../components/Register'
import { formVariant } from './Login'
import { motion } from 'framer-motion'
const Signup = () => {
  document.title="Blogspurr | Sign Up"

  return (
    <motion.div 
    variants={formVariant}
    initial='initial'
    animate='final'
    >

        <Register/>
    </motion.div>
  )
}

export default Signup