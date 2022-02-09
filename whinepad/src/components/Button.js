import classNames from 'classnames'

const Button = (props) => {
    return props.href ? (
        <a {...props} className={classNames('Button', props.className)}>
            {props.children}
        </a>
    ) : (
        <button {...props} className={classNames('Button', props.className)}/>
    )
}

export default Button