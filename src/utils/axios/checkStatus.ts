import type { ErrorMessageMode } from '/#/axios';
import { useMessage } from '@/hooks/web/useMessage';
import { HTTP_API_MSG } from '@/constants/http';

const { createMessage, createErrorModal } = useMessage();
const error = createMessage.error!;

export function checkStatus(
    status: number,
    msg: string,
    errorMessageMode: ErrorMessageMode = 'message',
): void {
    let errMessage = '';

    switch (status) {
        case 400:
            errMessage = `${msg}`;
            break;
        // 401: Not logged in
        // Jump to the login page if not logged in, and carry the path of the current page
        // Return to the current page after successful login. This step needs to be operated on the login page.
        case 401:
            errMessage = msg || HTTP_API_MSG.errMsg401;
            setTimeout(() => {
                location.href = `${import.meta.env.VITE_LOGIN_HOST}?url=${encodeURIComponent(
                    location.href,
                )}`;
            }, 400);
            break;
        case 403:
            errMessage = HTTP_API_MSG.errMsg403;
            break;
        // 404请求不存在
        case 404:
            errMessage = HTTP_API_MSG.errMsg404;
            break;
        case 405:
            errMessage = HTTP_API_MSG.errMsg405;
            break;
        case 408:
            errMessage = HTTP_API_MSG.errMsg408;
            break;
        case 500:
            errMessage = HTTP_API_MSG.errMsg500;
            break;
        case 501:
            errMessage = HTTP_API_MSG.errMsg501;
            break;
        case 502:
            errMessage = HTTP_API_MSG.errMsg502;
            break;
        case 503:
            errMessage = HTTP_API_MSG.errMsg503;
            break;
        case 504:
            errMessage = HTTP_API_MSG.errMsg504;
            break;
        case 505:
            errMessage = HTTP_API_MSG.errMsg505;
            break;
        default:
    }

    if (errMessage) {
        if (errorMessageMode === 'modal') {
            createErrorModal({ title: HTTP_API_MSG.errorTip, content: errMessage });
        } else if (errorMessageMode === 'message') {
            error({ content: errMessage, key: `global_error_message_status_${status}` });
        }
    }
}
