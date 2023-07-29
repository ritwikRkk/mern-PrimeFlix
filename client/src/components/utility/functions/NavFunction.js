
const toggleMobileMenu = () => {
    const navToggle = document.querySelector('.navbar__toggle');
    const navMenu = document.querySelector('.navbar__menu');

    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    // console.log("toggleMobileMenu");
}

const handleScroll = (scrollHeight, setScrollHeight, location) => {
    // console.log("handleScroll", window.scrollY);
    // let scrollPos = window.scrollY;
    setScrollHeight(window.scrollY);

    // hiding and unhiding the scroller
    let scroller_container = document.querySelector(".scroller_container");

    //  SET THE --navbar-opacity TO 1 FOR CATEGORIES PAGE ONLY
    if ((scrollHeight >= 80) || (location.pathname.split("/")[1] === "categories")) {
        document.documentElement.style.setProperty('--navbar-opacity', 1)
        scroller_container.style.display = "flex";
    } else {
        document.documentElement.style.setProperty('--navbar-opacity', 0.5)
        scroller_container.style.display = "none";
    }
}

const linear_gradient = {
    dark: "linear-gradient(90deg, rgba(0,0,0,1) 20%, rgba(255,252,252,0) 66%, rgba(255,255,255,0) 100%)",
    light: "linear-gradient(90deg, rgba(255,255,255,1) 20%, rgba(255,255,255,0) 66%, rgba(255,255,255,0) 100%)",
    dark_mobile: "linear-gradient(90deg, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.2) 66%, rgba(0,0,0,0.2) 100%)",
    light_mobile: "linear-gradient(90deg, rgba(255,255,255,1) 20%, rgba(255,255,255,0) 66%, rgba(255,255,255,0) 100%)",
    // LINEAR GRADIENT FOR MEDIADETAILS PAGE
    dark_lGradHero: "linear-gradient(to right, rgba(0,0,0,0.35) 100%, transparent 35%), linear-gradient(to left, rgba(0,0,0,0.4) 20%, transparent 40%), linear-gradient(to bottom, rgba(0,0,0,0.5) 20%, transparent 30%), linear-gradient(to top, rgba(0,0,0,0.8) 10%, transparent 20%)",
    light_lGradHero: "linear-gradient(to right, rgba(255,255,255,0.4) 100%, transparent 30%), linear-gradient(to left, rgba(255,255,255,0.4) 5%, transparent 15%), linear-gradient(to bottom, rgba(255,255,255,0.3) 20%, transparent 30%), linear-gradient(to top, rgba(255,255,255,0.5) 5%, transparent 20%)",
}
const handleThemeMode = (mode, setThemeMode) => {
    // console.log(mode);
    switch (mode) {
        case "light":
            document.documentElement.style.setProperty("--bg-color", "white");
            document.documentElement.style.setProperty("--text-color", "black");
            document.documentElement.style.setProperty("--linear-gradient", linear_gradient.light);
            document.documentElement.style.setProperty("--linear-gradient-opacity", "0.3");
            document.documentElement.style.setProperty("--linear-gradient-mobile", linear_gradient.light_mobile);
            document.documentElement.style.setProperty("--lGradHero", linear_gradient.light_lGradHero);
            setThemeMode("light");
            break;
        case "dark":
            document.documentElement.style.setProperty("--bg-color", "black");
            document.documentElement.style.setProperty("--text-color", "white");
            document.documentElement.style.setProperty("--linear-gradient", linear_gradient.dark);
            document.documentElement.style.setProperty("--linear-gradient-opacity", "0.3");
            document.documentElement.style.setProperty("--linear-gradient-mobile", linear_gradient.dark_mobile);
            document.documentElement.style.setProperty("--lGradHero", linear_gradient.dark_lGradHero);
            setThemeMode("dark");
            break;
        default:
            setThemeMode("dark");
    }
}


export { toggleMobileMenu, handleScroll, handleThemeMode }