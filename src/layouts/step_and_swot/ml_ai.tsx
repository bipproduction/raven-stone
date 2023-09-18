import { Stack } from "@mantine/core";
import PageTitle from "../page_title";
import _ from "lodash";
import useTranslate from 'next-translate/useTranslation'

export default function Mlai() {
    const { t, lang } = useTranslate()
    return (
        <>
            <Stack spacing={"md"}>
                <PageTitle
                    title={_.upperCase(t('common:ml_ai'))}
                />
            </Stack>
        </>
    )
}