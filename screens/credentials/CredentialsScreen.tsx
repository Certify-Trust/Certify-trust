"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown, ChevronUp, X, FileText, User, Activity, Linkedin, Eye, MoreVertical, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCredentials } from "@/context/CredentialsContext";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Credential {
  id: string;
  recipientName: string;
  recipientEmail: string;
  group: string;
  credentialId: string;
  issueDate: string;
  expiryDate: string;
  published: boolean;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_CREDENTIALS: Credential[] = [
  { id: "1", recipientName: "Zoya Blanchard", recipientEmail: "zoya.blanchard@gmail.com", group: "Vesting", credentialId: "58392014", issueDate: "May 6, 2026", expiryDate: "-", published: false },
  { id: "2", recipientName: "Jamison Quintero", recipientEmail: "jamison.quintero@gmail.com", group: "Vesting", credentialId: "78430291", issueDate: "May 6, 2026", expiryDate: "-", published: true },
  { id: "3", recipientName: "Kiana Bergson", recipientEmail: "kiana.bergson@gmail.com", group: "Vesting", credentialId: "20149275", issueDate: "May 6, 2026", expiryDate: "-", published: false },
  { id: "4", recipientName: "Alistair Starsky", recipientEmail: "alistair.starsky@gmail.com", group: "Vesting", credentialId: "39820467", issueDate: "May 6, 2026", expiryDate: "-", published: false },
  { id: "5", recipientName: "Rowan Venkman", recipientEmail: "rowan.venkman@gmail.com", group: "Vesting", credentialId: "65748230", issueDate: "May 6, 2026", expiryDate: "-", published: false },
  { id: "6", recipientName: "Jules Callaghan", recipientEmail: "jules.callaghan@gmail.com", group: "Vesting", credentialId: "81930562", issueDate: "May 6, 2026", expiryDate: "-", published: false },
];

const getInitials = (name: string) =>
  name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

const getColor = (name: string) => {
  const colors = ["bg-purple-100 text-purple-700", "bg-blue-100 text-blue-700", "bg-green-100 text-green-700", "bg-orange-100 text-orange-700", "bg-pink-100 text-pink-700"];
  return colors[name.charCodeAt(0) % colors.length];
};

// ─── Publish Modal ────────────────────────────────────────────────────────────

const PublishModal = ({ onCancel, onPublish }: { onCancel: () => void; onPublish: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="relative bg-white rounded-2xl shadow-xl w-[480px] mx-4 overflow-hidden">
      <button onClick={onCancel} className="absolute right-4 top-4 text-[#667085] hover:text-[#344054]">
        <X size={18} />
      </button>
      <div className="h-px w-full bg-[#EAECF0] absolute top-12 left-0" />

      <div className="flex flex-col items-center gap-4 px-10 py-8 text-center mt-4">
        {/* Illustration */}
        <div className="relative w-32 h-32">
          <div className="absolute bottom-0 left-4 w-20 h-24 bg-blue-100 rounded-lg flex items-end justify-center pb-2 shadow-md">
            <div className="space-y-1 w-12">
              <div className="h-1.5 bg-blue-300 rounded" />
              <div className="h-1.5 bg-blue-300 rounded w-3/4" />
              <div className="h-1.5 bg-blue-300 rounded" />
            </div>
          </div>
          <div className="absolute bottom-2 right-0 w-20 h-24 bg-blue-200 rounded-lg flex flex-col items-center justify-center gap-1 shadow-lg">
            <div className="w-8 h-8 rounded-full bg-blue-300 flex items-center justify-center">
              <User size={16} className="text-blue-600" />
            </div>
            <div className="space-y-1 w-12">
              <div className="h-1.5 bg-blue-400 rounded" />
              <div className="h-1.5 bg-blue-400 rounded w-3/4" />
            </div>
            <div className="flex gap-0.5 mt-1">
              {[...Array(4)].map((_, i) => (
                <svg key={i} width="10" height="10" viewBox="0 0 10 10" fill="#FBBF24"><path d="M5 0l1.5 3h3l-2.5 2 1 3L5 6.5 2 8l1-3L.5 3h3z"/></svg>
              ))}
            </div>
          </div>
          <div className="absolute top-0 right-2 w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center shadow">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="white"><path d="M8 0l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z"/></svg>
          </div>
        </div>

        <h2 className="text-lg font-semibold text-[#101828]">Publish this Credential?</h2>
        <p className="text-sm text-[#667085]">
          Publishing will notify the recipient via Email.<br />
          Are you sure you want to publish this credential?
        </p>

        <div className="flex gap-3 w-full mt-2">
          <Button variant="outline" className="flex-1 border-[#D0D5DD] text-[#344054]" onClick={onCancel}>
            Cancel
          </Button>
          <Button className="flex-1 bg-[#5324FB] hover:bg-[#6B46FC] text-white" onClick={onPublish}>
            Publish
          </Button>
        </div>
      </div>
    </div>
  </div>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────

const CredentialsScreen = () => {
  const router = useRouter();
  const { credentials, publishCredential, publishCredentials, deleteCredentials } = useCredentials();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [publishModalId, setPublishModalId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = credentials.filter(
    (c) =>
      c.recipientName.toLowerCase().includes(search.toLowerCase()) ||
      c.recipientEmail.toLowerCase().includes(search.toLowerCase()) ||
      c.credentialId.includes(search)
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === paginated.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginated.map((c) => c.id)));
    }
  };

  const handlePublish = (id: string) => {
  publishCredential(id);
  setPublishModalId(null);
};

const handleBulkPublish = () => {
  publishCredentials(Array.from(selectedIds));
  setSelectedIds(new Set());
};

  const hasSelection = selectedIds.size > 0;

  return (
    <div className="min-h-screen space-y-5 pb-20">
      {publishModalId && (
        <PublishModal
          onCancel={() => setPublishModalId(null)}
          onPublish={() => handlePublish(publishModalId)}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#101828]">Credentials</h1>
        <div className="flex gap-3">
          <Button variant="outline" className="border-[#D0D5DD] text-[#344054]">Update Credentials</Button>
          <Button className="bg-[#5324FB] hover:bg-[#6B46FC] text-white" onClick={() => router.push("/dashboard/groups")}>
            Create Credentials
          </Button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#98A2B3]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for design name, email, or ID..."
            className="h-10 w-full rounded-lg border border-[#D0D5DD] pl-9 pr-4 text-sm text-[#344054] placeholder:text-[#98A2B3] focus:outline-none focus:ring-1 focus:ring-[#5324FB]"
          />
        </div>
        {["Collections", "Groups", "Status"].map((filter) => (
          <button key={filter} className="flex items-center gap-2 rounded-lg border border-[#D0D5DD] px-4 h-10 text-sm text-[#344054] hover:bg-[#F2F4F7]">
            {filter} <ChevronDown size={14} />
          </button>
        ))}
      </div>

      {/* Bulk Actions */}
      <div className="flex items-center gap-3">
        <span className={cn("text-sm font-medium", hasSelection ? "text-[#5324FB]" : "text-[#667085]")}>
          {selectedIds.size} Selected credentials
        </span>
        <Button
          variant="outline"
          className={cn("border-[#D0D5DD]", hasSelection ? "text-[#344054]" : "text-[#D0D5DD]")}
          disabled={!hasSelection}
          onClick={handleBulkPublish}
        >
          Publish
        </Button>
        <Button
          variant="outline"
          className={cn("border-[#D0D5DD]", hasSelection ? "text-[#344054]" : "text-[#D0D5DD]")}
          disabled={!hasSelection}
        >
          Set Expiry Date
        </Button>
        <Button
          variant="outline"
          className={cn("gap-1 border-[#D0D5DD]", hasSelection ? "text-[#344054]" : "text-[#D0D5DD]")}
          disabled={!hasSelection}
        >
          Export <ChevronDown size={14} />
        </Button>
        <Button
          variant="outline"
          className={cn("border", hasSelection ? "border-red-300 text-red-500 hover:bg-red-50" : "border-[#D0D5DD] text-[#D0D5DD]")}
          disabled={!hasSelection}
        >
          Delete
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-[#EAECF0] bg-white overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#EAECF0]">
              <th className="w-10 px-4 py-3">
                <input
                  type="checkbox"
                  checked={paginated.length > 0 && selectedIds.size === paginated.length}
                  onChange={toggleSelectAll}
                  className="h-4 w-4 rounded accent-[#5324FB]"
                />
              </th>
              <th className="px-3 py-3 text-left text-sm font-medium text-[#667085]">Recipient</th>
              <th className="px-3 py-3 text-left text-sm font-medium text-[#667085]">Group</th>
              <th className="px-3 py-3 text-left text-sm font-medium text-[#667085]">Credential ID</th>
              <th className="px-3 py-3 text-left text-sm font-medium text-[#667085]">
                <div className="flex items-center gap-1">Status <ChevronUp size={12} /></div>
              </th>
              <th className="px-3 py-3 text-left text-sm font-medium text-[#667085] w-8"></th>
              <th className="px-3 py-3 text-left text-sm font-medium text-[#667085]">
                <div className="flex items-center gap-1">Issue Date <ChevronUp size={12} /></div>
              </th>
              <th className="px-3 py-3 text-left text-sm font-medium text-[#667085]">Expiry Date</th>
              <th className="px-3 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((c) => (
              <tr key={c.id} className="border-b border-[#EAECF0] last:border-0 hover:bg-[#F9FAFB]">
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(c.id)}
                    onChange={() => toggleSelect(c.id)}
                    className="h-4 w-4 rounded accent-[#5324FB]"
                  />
                </td>
                <td className="px-3 py-4">
                  <div className="flex items-center gap-3">
                    <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold", getColor(c.recipientName))}>
                      {getInitials(c.recipientName)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#101828]">{c.recipientName}</p>
                      <p className="text-xs text-[#667085] truncate max-w-[160px]">{c.recipientEmail}</p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-4 text-sm text-[#344054]">{c.group}</td>
                <td className="px-3 py-4 text-sm text-[#344054]">{c.credentialId}</td>
                <td className="px-3 py-4">
                  <div className="flex items-center gap-2">
                    <FileText size={16} className={c.published ? "text-green-500" : "text-[#98A2B3]"} />
                    <User size={16} className="text-[#98A2B3]" />
                    <Activity size={16} className="text-[#98A2B3]" />
                    <Linkedin size={16} className="text-[#98A2B3]" />
                    <Eye size={16} className="text-[#98A2B3]" />
                  </div>
                </td>
                <td className="px-3 py-4 text-sm text-[#344054]">{c.issueDate}</td>
                <td className="px-3 py-4 text-sm text-[#344054]">{c.expiryDate}</td>
                <td className="px-3 py-4">
                  <div className="flex items-center gap-3">
                    {c.published ? (
                      <button className="flex items-center gap-1 text-sm font-medium text-[#344054] hover:text-[#5324FB]">
                        <Download size={14} /> Download
                      </button>
                    ) : (
                      <button
                        className="text-sm font-semibold text-[#344054] hover:text-[#5324FB]"
                        onClick={() => setPublishModalId(c.id)}
                      >
                        Publish
                      </button>
                    )}
                    <span className="text-sm font-medium text-[#5324FB] cursor-pointer hover:underline">Open</span>
                    <button className="text-[#98A2B3] hover:text-[#344054]">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer pagination */}
      <div className="fixed bottom-0 left-[280px] right-0 max-[1280px]:left-64 flex items-center justify-between border-t border-[#EAECF0] bg-white px-8 py-4">
        <span className="text-sm text-[#667085]">
          Viewing {filtered.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} credentials
        </span>
        <div className="flex gap-2">
          <Button variant="outline" className="h-9" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
            Previous
          </Button>
          <Button variant="outline" className="h-9" disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CredentialsScreen;