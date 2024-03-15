export type Repayment = {
  id: number
  status: string
  paid_on: string
  due_date: string
  emiAmount: number
  remainingAmount: number
}

export type Loan = {
  id: number
  lender_id: null | number
  borrower_id: number
  principalAmount: number
  tenure: number
  status: string
  interestRate: number
  totalPayableAmount: number | null
  totalRemainingAmount: number | null
  incurredInterest: number | null
  repayments: Repayment[]
  createdAt: string
  updatedAt: string
}

export enum USER_ROLE {
  LENDER = 'LENDER',
  BORROWER = 'BORROWER'
}

export type User = {
  name: string
  email: string
  role: USER_ROLE
  id: number
  createdAt: string
  updatedAt: string
}
