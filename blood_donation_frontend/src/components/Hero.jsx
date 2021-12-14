const Hero = (props) => {
    return (
        <>
            <div className="container-fluid py-5 hero-section">
                <h1 className="my-4">{props.title}</h1>
                <p className="">{props.desc}</p>
                <button type="button" className="btn btn-info">Learn More</button>
            </div>
        </>
    )
}

export default Hero;