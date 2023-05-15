const Footer = () => {
    return (
        <footer className='footer'>
            <div className="footer__main">
                <div className="footer__main-item">
                    <h4>Сервисы</h4>
                    <p>Подбор авто</p>
                    <p>Оценки рисков</p>
                    <p>Поиск подборщиков</p>
                    <p>Подбор запчестей</p>
                    <p>Форум CarTron</p>
                    <p>Страховка / Кредитование</p>
                </div>
                <div className="footer__main-item">
                    <h4>О компании CarTron</h4>
                    <p>Руководство CarTron</p>
                    <p>Карьера в CarTron</p>
                    <p>Гарантии</p>
                    <p>Инвесторы</p>
                    <p>Этика и политика компании</p>
                    <p>Контактная информация</p>
                </div>
                <div className="footer__main-item">
                    <h4>Пользователям</h4>
                    <p>Правила площадки</p>
                    <p>Lorem ipsum</p>
                    <p>Lorem ipsum</p>
                    <p>Lorem, ipsum dolor</p>
                    <p>Lorem ipsum dolor sit</p>
                    <p>Lorem, ipsum dolor</p>
                </div>
            </div>
            <div className="footer__footer">
                <div className="footer__footer-itemWrapper">
                    <span className='footer__footer-item'>Политика конфиденциальности</span>
                </div>
                <div className="footer__footer-itemWrapper">
                    <span className='footer__footer-item'>Использование cookies</span>
                </div>
                <div className="footer__footer-itemWrapper">
                    <span className='footer__footer-item'>Юридическая Информация</span>
                </div>
                <div className="footer__footer-itemWrapper footer__footer-society">
                    <img src="/classmates.png" alt="Мы в однокласниках" className='footer__footer-classmates' />
                    <img src="/vk.png" alt="Мы ВКонтакте" />
                    <img src="/youtube.png" alt="Мы на YouTube" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;