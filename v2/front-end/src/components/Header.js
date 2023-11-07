import PropTypes from 'prop-types'
import Button from './Button'
const Header = ({title}) => {
    const onClick = () => {
        alert("click");
    }

    return (
        <header className="header">
            <h1>{title}</h1>
            <Button onClick={onClick} />
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