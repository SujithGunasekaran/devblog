import Image from 'next/image';

const page404 = () => {

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <div className="page_404_container">
                            <Image
                                src={'/assert/image/404.svg'}
                                width={500}
                                height={500}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default page404;
