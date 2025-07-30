export default function ApplicationLogo(props) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <img
                src="/assets/logo-new.png"
                alt="Logo"
                {...props}
                style={{ height: 70, width: 192, ...props.style }}
            />
        </div>
    );
}