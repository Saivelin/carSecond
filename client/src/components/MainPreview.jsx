import Link from "next/link";

const MainPreview = () => {
    return (
        <div className='mainPreview'>
            <div className="mainPreview__content">
                <h1>CarTron - более 3000 продаж в неделю</h1>
                <Link href={"/registration"} className="button-secondary">Зарегистрироваться</Link>
            </div>
        </div>
    );
};

export default MainPreview;