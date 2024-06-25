const Footer = () => {
  return (
    <div>
      <div className="footer bg-black h-20 w-full">
        <div className="h-full flex justify-center items-center">
            <div className="github">
                <button type="button" className="text-gray-900 bg-white border font-medium rounded text-sm px-5 py-2.5 me-2 hover:border hover:border-white hover:text-white hover:bg-black"><i className="fa-brands fa-github mr-2"></i><a href="https://github.com/aakashsaini09" target="_blank">Github</a></button>
            </div>
            <div className="github">
                <button type="button" className="text-gray-900 bg-white border font-medium rounded text-sm px-5 py-2.5 me-2 hover:border hover:border-white hover:text-white hover:bg-black"><i className="fa-brands fa-twitter mr-2"></i><a href="https://x.com/__aakashsaini" target="_blank">Twitter</a></button>
            </div>
            <div className="Linkedin">
                <button type="button" className="text-gray-900 bg-white border font-medium rounded text-sm px-5 py-2.5 me-2 hover:border hover:border-white hover:text-white hover:bg-black"><i className="fa-brands fa-linkedin-in mr-2"></i><a href="https://www.linkedin.com/in/-aakashsaini/" target="_blank">Linkedin</a></button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
