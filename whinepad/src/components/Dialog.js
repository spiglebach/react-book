import Button from "./Button";
import {useEffect} from "react";

const Dialog = (props) => {
    const {
        header,
        modal = false,
        extendedDismiss = true,
        confirmLabel = 'ok',
        onAction = () => {},
        hasCancel = true
    } = props

    useEffect(() => {
        function dismissClick(e) {
            if (e.target.classList.contains('DialogModal')) {
                onAction('dismiss')
            }
        }

        function dismissKey(e) {
            if (e.key === 'Escape') {
                onAction('dismiss')
            }
        }

        if (modal) {
            document.body.classList.add('DialogModalOpen')
            if (extendedDismiss) {
                document.body.addEventListener('click', dismissClick)
                document.addEventListener('keydown', dismissKey)
            }
        }
        return () => {
            document.body.classList.remove('DialogModalOpen')
            document.body.removeEventListener('click', dismissClick)
            document.removeEventListener('keydown', dismissKey)

        }
    }, [onAction, modal, extendedDismiss])

    return (
        <div className={modal ? 'Dialog DialogModal' : 'Dialog'}>
            <div className={modal ? "DialogModalWrap" : null}>
                <div className="DialogHeader">{header}</div>
                <div className="DialogBody">{props.children}</div>
                <div className="DialogFooter">
                    {hasCancel ? (
                        <Button className="DialogDismiss" onClick={() => onAction('dismiss')}>
                            Cancel
                        </Button>
                    ) : null}
                    <Button onClick={() => onAction(hasCancel ? 'confirm' : 'dismiss')}>
                        {confirmLabel}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Dialog