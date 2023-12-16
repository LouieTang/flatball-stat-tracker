import PropTypes from 'prop-types'
const Header = ({title}) => {
    return (
        <header className="header center-text">
            <h1>{title}</h1>
        </header> 
    )
}

Header.defaultProps = {
    title: "Ultimate Frisbee Stat Tracker",
}
Header.propTypes = {
    title: PropTypes.string,
}

export default Header