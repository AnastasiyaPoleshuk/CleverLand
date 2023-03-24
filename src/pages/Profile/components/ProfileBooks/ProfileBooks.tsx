import './ProfileBooks.scss';

interface IProps {
    title: string,
    subtitle: string,
    emptyFieldText: string[],
    isEmpty: boolean;
    warningTitle: string,
    warningSubtitle: string,
    component?: JSX.Element,
    isWarning: boolean,
}

export const ProfileBooks = (props: { data: IProps }) => {
    const { title, subtitle, emptyFieldText, isEmpty, warningTitle, warningSubtitle, isWarning, component } = props.data;

    return (
        <section className="profile-books__section">
            <h3 className="profile-books__title">{title}</h3>
            <p className="profile-books__subtitle">{subtitle}</p>

            <div className="card-wrap">
                {
                    isEmpty ?
                        <div className="profile-books__empty-field" data-test-id='empty-blue-card'>
                            {emptyFieldText[0]}
                            <br />
                            {emptyFieldText[1]}
                        </div>
                        : component
                }
                {
                    isWarning && <div className="profile-books__warn-field warn" data-test-id='expired'>
                        <h3 className="warn__title">{warningTitle}</h3>
                        <p className="warn__subtitle">{warningSubtitle}</p>
                    </div>
                }
            </div>




        </section>
    )
}
