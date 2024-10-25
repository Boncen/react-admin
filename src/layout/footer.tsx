
export function Footer() {

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '20px',
            color: 'var(--semi-color-text-2)',
            backgroundColor: 'rgba(var(--semi-grey-0), 1)',
        }}>
            <span
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <span>Copyright © 2019 ByteDance. All Rights Reserved. </span>
            </span>
            <span>
                <span style={{ marginRight: '24px' }}>平台客服</span>
                <span>反馈建议</span>
            </span>
        </div>
    )
}