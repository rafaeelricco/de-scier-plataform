import '@styles/login.css'
import Image from 'next/image'
import deScierStamp from 'public/svgs/modules/login/selo.png'
import BlobShape from 'public/svgs/modules/login/shape.svg'
import React, { useEffect } from 'react'

const LoginAnimation: React.FC = () => {
   useEffect(() => {
      const svgatorObject: any = document?.getElementById('animated-svg')
      const svgatorDocument =
         svgatorObject?.contentDocument || svgatorObject?.contentWindow.document
      const svgatorElement = svgatorDocument.getElementById('descier-login-animation')
      svgatorElement?.svgatorPlayer?.play()
   }, [])

   return (
      <React.Fragment>
         <div className="w-full relative overflow-hidden login-animation-container">
            <div className="login-text">
               <div className="grid gap-2">
                  <h2 className="font-semibold text-xl text-neutral-white">
                     Welcome to our platform!
                  </h2>
                  <p className="text-base text-neutral-white">
                     Easy scientific article publication, with <br /> 100% of the copyrights to the
                     author,
                     <br /> protected by Blockchain technology.
                  </p>
               </div>
               <h2 className="font-semibold text-xl text-neutral-white">
                  Join the DeSci movement!
               </h2>
            </div>
            <object
               className="login-animation"
               id="animated-svg"
               type="image/svg+xml"
               data="/svgs/modules/login/deScier - Login animation (1).svg"
            />
            <BlobShape className="login-blob-shape" />
            <Image
               width={124}
               height={124}
               src={deScierStamp}
               alt="deScier stamp"
               className="login-stamp"
            />
         </div>
      </React.Fragment>
   )
}

export default LoginAnimation
