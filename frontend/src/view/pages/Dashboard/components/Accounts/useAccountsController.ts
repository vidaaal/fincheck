import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { bankAccountsService } from "../../../../../app/services/bankAccountsService";
import { useDashboard } from "../DashboardContext/useDashboard";

export function useAccountsController() {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false
  })

  const windowWidth = useWindowWidth()

  const {
    toggleValuesVisibility,
    areValuesVisible,
    openNewAccountModal,
  } = useDashboard()

  const { accounts, isFetching } = useBankAccounts()

  const currentBalance = useMemo(() => {
    if (!accounts) return 0

    return accounts.reduce((total, account) => total + account.currentBalance, 0)
  }, [accounts])

  return {
    sliderState,
    setSliderState,
    windowWidth,
    toggleValuesVisibility,
    openNewAccountModal,
    areValuesVisible,
    isLoading: isFetching,
    accounts,
    currentBalance
  }
}
