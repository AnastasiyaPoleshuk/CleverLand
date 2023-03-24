import moment from 'moment';

interface IProps {
    text: string,
}

export const CardDeliveryButton = (props: IProps) => {
    const { text } = props;

    return (
        <button type="button" className="delivery__btn">Возврат &nbsp; {text && moment(text).format('DD.MM')}</button>
    )
}
