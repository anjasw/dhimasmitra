export default function ApplicationLogo(props) {
    return (
        <img
            src="/storage/assets/img/logo-new.png"
            alt="Logo"
            {...props}
            style={{ height: 70, width: 192, backgroundColor: '#232323', ...props.style }}
        />
    );
}