"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  Button,
  Input,
  Textarea,
  makeStyles,
  tokens,
  Select,
} from "@fluentui/react-components"
import { FolderAddRegular } from "@fluentui/react-icons"
import { addDeliverable } from "../../../api/session-service"

const useStyles = makeStyles({
  formField: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    marginBottom: "1rem",
  },
  label: {
    fontWeight: tokens.fontWeightSemibold,
  },
  errorText: {
    color: tokens.colorStatusDangerForeground1,
    fontSize: tokens.fontSizeBase200,
    marginTop: "0.25rem",
  },
})

interface AddDeliverableModalProps {
  sessionId: string
  onDeliverableAdded: () => void
}

const AddDeliverableModal: React.FC<AddDeliverableModalProps> = ({ sessionId, onDeliverableAdded }) => {
  const styles = useStyles()
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("not started")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!title) {
      setError("Please enter a title")
      return
    }

    try {
      setLoading(true)
      setError(null)

      await addDeliverable(sessionId, {
        title,
        description,
        status,
        progress: status === "not started" ? 0 : 10,
        change: "+0%",
      })

      setOpen(false)
      onDeliverableAdded()
    } catch (err) {
      console.error("Error adding deliverable:", err)
      setError(err instanceof Error ? err.message : "Failed to add deliverable")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(e: any, data: { open: boolean | ((prevState: boolean) => boolean) }) => setOpen(data.open)}>
      <DialogTrigger disableButtonEnhancement>
        <Button icon={<FolderAddRegular />}>Add Deliverable</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogTitle>Add New Deliverable</DialogTitle>
        <DialogBody>
          <div className={styles.formField}>
            <label className={styles.label}>Title</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Prototype, Demo Video" />
          </div>

          <div className={styles.formField}>
            <label className={styles.label}>Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what this deliverable is about"
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.label}>Status</label>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="not started">Not Started</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </Select>
          </div>

          {error && <div className={styles.errorText}>{error}</div>}
        </DialogBody>
        <DialogActions>
          <Button appearance="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button appearance="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? "Adding..." : "Add Deliverable"}
          </Button>
        </DialogActions>
      </DialogSurface>
    </Dialog>
  )
}

export default AddDeliverableModal
