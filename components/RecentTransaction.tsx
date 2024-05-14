import Link from 'next/link'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BankItem } from './BankItem'
import BankInfo from './BankInfo'
import TransactionTable from './TransactionTable'
import { Pagination } from './Pagination'

const RecentTransaction = ({ accounts, appwriteItemId, page = 1, transactions = [] }: RecentTransactionsProps) => {

    const rowsPerPage = 10;
    const totalPages = Math.ceil(transactions.length / rowsPerPage);

    const indexOfLastTransaction = page * rowsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

    const currentTransactions = transactions.slice(
        indexOfFirstTransaction, indexOfLastTransaction
    )
    return (
        <section className='recent-transactions'>
            <header className='flex items-center justify-between'>
                <h2 className='recent-transactions-label'>
                    Recent transactions
                </h2>
                <Link href={`/transaction-history/?id=${appwriteItemId}`} className='view-all-btn'>
                    View All
                </Link>
            </header>
            <Tabs defaultValue={appwriteItemId} className="w-full">
                <TabsList className='recent-transactions-tablist'>
                    {accounts.map((a: Account) => (
                        <TabsTrigger key={a.id} value={a.appwriteItemId}>
                            <BankItem
                                key={a.id}
                                account={a}
                                appwriteItemId={appwriteItemId}
                            />
                        </TabsTrigger>
                    ))}
                </TabsList>
                {accounts.map((a: Account) => (
                    <TabsContent
                        key={a.id}
                        value={a.appwriteItemId}
                        className="space-y-4"
                    >
                        <BankInfo
                            account={a}
                            appwriteItemId={appwriteItemId}
                            type="full"
                        />

                        <TransactionTable
                            transactions={currentTransactions}
                        />
                        {totalPages > 1 && (<div className="my-4 w-full">
                            <Pagination
                                totalPages={totalPages} page={page}
                            />
                        </div>)}

                    </TabsContent>
                ))}
            </Tabs>
        </section >
    )
}

export default RecentTransaction