import links from './data'
import './footer.css'
import facebook from '../../assets/icon-logos/icon-facebook.svg'
import insta from '../../assets/icon-logos/icon-instagram.svg'
import pinterest from '../../assets/icon-logos/icon-pinterest.svg'
import twitter from '../../assets/icon-logos/icon-twitter.svg'

export default function Foot(){
  return (
    <footer>
    <div className='top-footer text-white mt-5 text-center'>   
    </div>
      <div className='last-footer flex text-white p-5 pb-2 flex-col text-center lg:flex-row lg:justify-around lg:text-start'>
        <div className='logo'>
          <h2 className='text-3xl'>Blogspurr</h2>
        </div>
          {
            links.map((item,index)=>{
              return(
                <div className='flex flex-col' key={index}>
                  <h3 className='text-2xl'>{item.title}</h3>
                  {
                    item.items.map((data,index)=>{
                      return <p className='my-2' key={index}>{data}</p>
                    })
                  }
                </div>
              )
            })
          }
        <div className='social flex sm:justify-center'>
        <img src={facebook} fill='red'></img>
        <img src={insta}></img>
        <img src={pinterest}></img>
        <img src={twitter}></img>        
        </div>
      </div>
    </footer>
  )
}