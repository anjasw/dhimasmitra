export default function ApplicationLogo(props) {
    return (
        <img
            src="/assets/logo-new.png"
            alt="Logo"
            {...props}
            style={{ height: 70, width: 192, backgroundColor: '#232323', ...props.style }}
        />
    );
}