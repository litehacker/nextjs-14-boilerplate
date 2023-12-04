import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import {
  fetchRevenue,
  fetchLatestInvoices,
  fetchCardData,
} from '@/app/lib/data';

export default async function Page() {
  const data: {
    revenue: any[];
    latestInvoices: any[];
    cardData: {
      totalPaidInvoices: string;
      totalPendingInvoices: string;
      numberOfInvoices: number;
      numberOfCustomers: number;
    };
  } = {
    revenue: [],
    latestInvoices: [],
    cardData: {
      totalPaidInvoices: '0',
      totalPendingInvoices: '0',
      numberOfInvoices: 0,
      numberOfCustomers: 0,
    },
  };

  try {
    [data.revenue, data.latestInvoices, data.cardData] = await Promise.all([
      fetchRevenue(),
      fetchLatestInvoices(),
      fetchCardData(),
    ]);
  } catch (error) {
    console.error('Error fetching data: ', error);
    // Handle the error appropriately here
    // You might want to set these to default values or show an error message to the user
  }

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card
          title="Collected"
          value={data.cardData.totalPaidInvoices}
          type="collected"
        />
        <Card
          title="Pending"
          value={data.cardData.totalPendingInvoices}
          type="pending"
        />
        <Card
          title="Total Invoices"
          value={data.cardData.numberOfInvoices}
          type="invoices"
        />
        <Card
          title="Total Customers"
          value={data.cardData.numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={data.revenue} />
        <LatestInvoices latestInvoices={data.latestInvoices} />
      </div>
    </main>
  );
}
