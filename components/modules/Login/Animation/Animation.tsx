import '@styles/login.css'
import Image from 'next/image'
import deScierStamp from 'public/svgs/modules/login/selo.png'
import BlobShape from 'public/svgs/modules/login/shape.svg'
import React, { useEffect } from 'react'

const LoginAnimation: React.FC = () => {
   useEffect(() => {
      const svgatorObject: any = document?.getElementById('animated-svg')

      const svgatorDocument = svgatorObject?.contentDocument || svgatorObject?.contentWindow.document

      const svgatorElement = svgatorDocument.getElementById('descier-login-animation')
      svgatorElement?.svgatorPlayer?.play()
   }, [])

   return (
      <React.Fragment>
         <div className="relative overflow-hidden login-animation-container h-[23rem] md:h-auto">
            <div className="login-text">
               <div className="grid gap-2">
                  <h2 className="font-semibold text-lg md:text-xl text-neutral-white">Redefining how you publish!</h2>
                  <p className="text-sm md:text-base text-neutral-white">
                     Publish easily, economically, peer-
                     <br />
                     reviewed scientific and technical
                     <br /> papers while retaining 100% of your
                     <br /> copyright, protected by blockchain
                     <br /> technology.
                  </p>
               </div>
               <h2 className="font-semibold text-lg md:text-xl text-neutral-white">Join the DeSci movement!</h2>
            </div>
            <object
               className="login-animation"
               id="animated-svg"
               type="image/svg+xml"
               data-autoplay={true}
               data="/svgs/modules/login/deScier - Login animation (1).svg"
            />
            <BlobShape className="login-blob-shape" />
            <Image quality={100} width={184} height={184} src={deScierStamp} alt="deScier stamp" className="login-stamp" />
         </div>
      </React.Fragment>
   )
}

export default LoginAnimation
