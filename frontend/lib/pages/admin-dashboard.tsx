import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Tabs, Table, Badge, Modal } from "flowbite-react";
import { useApi } from "../api";
import { ROUTES } from "../routes";

type Tab = "overview" | "puppies" | "inquiries" | "prices" | "users";

const STATUS_COLOR: Record<string, string> = {
  AVAILABLE: "bg-green-100 text-green-800",
  RESERVED: "bg-yellow-100 text-yellow-800",
  PENDING: "bg-orange-100 text-orange-800",
  SOLD: "bg-red-100 text-red-800",
  NEW: "bg-blue-100 text-blue-800",
  CONTACTED: "bg-yellow-100 text-yellow-800",
  INTERVIEWED: "bg-purple-100 text-purple-800",
  APPROVED: "bg-green-100 text-green-800",
  COMPLETED: "bg-gray-100 text-gray-800",
  REJECTED: "bg-red-100 text-red-800",
};

export default function AdminDashboard() {
  const nav = useNavigate();
  const { logout, isAdmin } = useApi();
  const [tab, setTab] = useState<Tab>("overview");
  const [stats, setStats] = useState({ puppies: 47, inquiries: 23, adopted: 18, revenue: 48750 });

  useEffect(() => { if (!isAdmin()) nav(ROUTES.LOGIN); }, []);

  const mockPuppies = [
    { id: 1, name: "Max", breed: "Golden", price: 1250, status: "AVAILABLE", market: "US" },
    { id: 2, name: "Bella", breed: "Frenchie", price: 2800, status: "PENDING", market: "US" },
    { id: 3, name: "Winston", breed: "Bulldog", price: 3500, status: "RESERVED", market: "UK" },
    { id: 4, name: "Luna", breed: "Husky", price: 1650, status: "AVAILABLE", market: "CA" },
    { id: 5, name: "Archie", breed: "Terrier", price: 1450, status: "SOLD", market: "UK" },
  ];
  const mockInquiries = [
    { id: 101, who: "Sarah Johnson", puppy: "Max", when: "2h ago", status: "NEW", email: "s@email.com" },
    { id: 102, who: "James Wilson", puppy: "Winston", when: "5h ago", status: "CONTACTED", email: "j@email.com" },
    { id: 103, who: "Priya Patel", puppy: "Bella", when: "1d ago", status: "INTERVIEWED", email: "p@email.com" },
    { id: 104, who: "The Harrisons", puppy: "Lola", when: "2d ago", status: "APPROVED", email: "h@email.com" },
  ];

  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900">🐾 CEO Dashboard</h1>
          <p className="text-sm text-gray-500">Full control — puppies, pricing, inquiries, users</p>
        </div>
        <div className="flex gap-2">
          <Button color="success">➕ Add New Puppy</Button>
          <Button color="gray" onClick={() => { logout(); nav("/"); }}>🚪 Logout</Button>
        </div>
      </div>

      {/* KPI CARDS — CEO only sees real revenue */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { l: "Total Puppies", v: stats.puppies, c: "#ea580c", i: "🐕" },
          { l: "Pending Inquiries", v: stats.inquiries, c: "#2563eb", i: "📧" },
          { l: "Adoptions This Mo.", v: stats.adopted, c: "#16a34a", i: "❤️" },
          { l: "Revenue MTD", v: `$${stats.revenue.toLocaleString()}`, c: "#7c3aed", i: "💰" },
        ].map((s, i) => (
          <div key={i} className="p-5 rounded-2xl bg-white shadow border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{s.i}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{s.l}</span>
            </div>
            <div className="text-3xl font-black" style={{ color: s.c }}>{s.v}</div>
          </div>
        ))}
      </div>

      <Tabs onActiveTabChange={i => setTab((["overview","puppies","inquiries","prices","users"] as Tab[])[i])} aria-label="Admin tabs">
        <Tabs.Item title="📊 Overview" active={tab === "overview"}>
          <div className="p-6 bg-white rounded-b-2xl border border-t-0 border-gray-200">
            <h3 className="font-black mb-4">Recent Activity</h3>
            <ul className="space-y-2 text-sm">
              <li>🔔 <strong>NEW inquiry</strong> from Sarah Johnson about Max · 2h ago</li>
              <li>💰 <strong>Deposit received</strong>: Winston $1,750 · 5h ago</li>
              <li>🐕 <strong>New puppy listed</strong>: Luna the Husky (CA) · yesterday</li>
              <li>✅ <strong>Archie adopted</strong> by family in Edinburgh · 2d ago</li>
            </ul>
          </div>
        </Tabs.Item>

        <Tabs.Item title="🐕 Puppies" active={tab === "puppies"}>
          <div className="bg-white rounded-b-2xl border border-t-0 border-gray-200 overflow-hidden">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Breed</Table.HeadCell>
                <Table.HeadCell>Market</Table.HeadCell>
                <Table.HeadCell>Price</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {mockPuppies.map(p => (
                  <Table.Row key={p.id} className="bg-white">
                    <Table.Cell className="font-bold">{p.name}</Table.Cell>
                    <Table.Cell>{p.breed}</Table.Cell>
                    <Table.Cell>{"🇺🇸🇬🇧🇨🇦"["USUKCA".indexOf(p.market)/2] || "🌍"} {p.market}</Table.Cell>
                    <Table.Cell className="font-black" style={{ color: "#ea580c" }}>${p.price.toLocaleString()}</Table.Cell>
                    <Table.Cell><Badge className={STATUS_COLOR[p.status]}>{p.status}</Badge></Table.Cell>
                    <Table.Cell><Button size="xs" color="gray">Edit</Button></Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Tabs.Item>

        <Tabs.Item title={`📧 Inquiries (${mockInquiries.length})`} active={tab === "inquiries"}>
          <div className="bg-white rounded-b-2xl border border-t-0 border-gray-200 overflow-hidden">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Customer</Table.HeadCell>
                <Table.HeadCell>About</Table.HeadCell>
                <Table.HeadCell>When</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Action</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {mockInquiries.map(i => (
                  <Table.Row key={i.id}>
                    <Table.Cell>
                      <div className="font-bold">{i.who}</div>
                      <div className="text-xs text-gray-500">{i.email}</div>
                    </Table.Cell>
                    <Table.Cell className="font-semibold">{i.puppy}</Table.Cell>
                    <Table.Cell className="text-gray-500 text-sm">{i.when}</Table.Cell>
                    <Table.Cell><Badge className={STATUS_COLOR[i.status]}>{i.status}</Badge></Table.Cell>
                    <Table.Cell><Button size="xs">Open</Button></Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Tabs.Item>

        <Tabs.Item title="💰 Pricing (CEO ONLY)" active={tab === "prices"}>
          <div className="p-6 bg-white rounded-b-2xl border border-t-0 border-gray-200">
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-sm">
              ⚠️ <strong>CEO ONLY:</strong> Price changes are logged and emailed to the audit log. Staff accounts cannot see this tab.
            </div>
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Breed</Table.HeadCell>
                <Table.HeadCell>US Price</Table.HeadCell>
                <Table.HeadCell>UK Price</Table.HeadCell>
                <Table.HeadCell>CA Price</Table.HeadCell>
                <Table.HeadCell>Deposit</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {[
                  ["Golden Retriever", 1250, 1100, 1650, 500],
                  ["French Bulldog", 2800, 2600, 3400, 1000],
                  ["Labrador", 950, 850, 1250, 400],
                  ["English Bulldog", 3500, 3200, 4200, 1500],
                  ["Siberian Husky", 1650, 1500, 1800, 700],
                ].map((row, i) => (
                  <Table.Row key={i}>
                    <Table.Cell className="font-bold">{row[0]}</Table.Cell>
                    {[1,2,3].map(j => <Table.Cell key={j}><input type="number" defaultValue={row[j] as number} className="w-28 px-2 py-1 border rounded font-mono" /></Table.Cell>)}
                    <Table.Cell>${row[4]}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            <div className="mt-4"><Button className="font-bold">💾 Save All Prices</Button></div>
          </div>
        </Tabs.Item>

        <Tabs.Item title="👥 Users & Permissions" active={tab === "users"}>
          <div className="p-6 bg-white rounded-b-2xl border border-t-0 border-gray-200">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>User</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Role</Table.HeadCell>
                <Table.HeadCell>Permissions</Table.HeadCell>
                <Table.HeadCell>Action</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                <Table.Row><Table.Cell className="font-bold">👑 You (CEO)</Table.Cell><Table.Cell>ceo@pawfect...</Table.Cell><Table.Cell><Badge color="failure">SUPERUSER</Badge></Table.Cell><Table.Cell>ALL</Table.Cell><Table.Cell>—</Table.Cell></Table.Row>
                <Table.Row><Table.Cell className="font-bold">Emma T.</Table.Cell><Table.Cell>emma@pawfect...</Table.Cell><Table.Cell><Badge color="warning">Staff</Badge></Table.Cell><Table.Cell>Inquiries only</Table.Cell><Table.Cell><Button size="xs" color="gray">Edit</Button></Table.Cell></Table.Row>
                <Table.Row><Table.Cell className="font-bold">Marcus W.</Table.Cell><Table.Cell>marcus@pawfect...</Table.Cell><Table.Cell><Badge color="warning">Staff</Badge></Table.Cell><Table.Cell>Puppies + Inquiries</Table.Cell><Table.Cell><Button size="xs" color="gray">Edit</Button></Table.Cell></Table.Row>
              </Table.Body>
            </Table>
            <div className="mt-4"><Button color="success">➕ Invite New Staff</Button></div>
          </div>
        </Tabs.Item>
      </Tabs>
    </div>
  );
}