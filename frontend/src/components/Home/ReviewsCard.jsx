import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useUI } from "../../hooks/useUI";
import {
  getReviews,
  addReview,
  updateReview,
  deleteReview,
} from "../../services/api";
import { IoTrashOutline, IoPencilOutline, IoStarSharp } from "react-icons/io5";
import EmptyState from "../EmptyState";

function StarRating({ value, onChange, readonly = false }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <IoStarSharp
          key={star}
          onClick={() => !readonly && onChange?.(star)}
          className={`text-xl transition-colors ${
            star <= value ? "text-amber-400" : "text-(--text-muted)"
          } ${!readonly ? "cursor-pointer hover:text-amber-300" : ""}`}
        />
      ))}
    </div>
  );
}

function ReviewItem({ review, onUpdate, onDelete }) {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);
  const isOwner = user?.uid === review.userId;

  const handleSave = async () => {
    await onUpdate(review.id, { rating, comment });
    setEditing(false);
  };

  return (
    <div className="flex flex-col gap-2 bg-(--bg-input) rounded-xl p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {review.photoURL ? (
            <img
              src={review.photoURL}
              className="w-7 h-7 rounded-full object-cover"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-(--bg-card) flex items-center justify-center text-xs text-(--text-secondary)">
              {review.displayName?.[0] ?? "?"}
            </div>
          )}
          <p className="text-(--text-primary) text-sm font-medium">
            {review.displayName}
          </p>
        </div>
        {isOwner && (
          <div className="flex gap-2">
            <button
              onClick={() => setEditing(!editing)}
              className="text-(--text-secondary) hover:text-(--text-primary) transition-colors"
            >
              <IoPencilOutline className="text-lg" />
            </button>
            <button
              onClick={() => onDelete(review.id)}
              className="text-red-400 hover:text-red-500 transition-colors"
            >
              <IoTrashOutline className="text-lg" />
            </button>
          </div>
        )}
      </div>

      {editing ? (
        <div className="flex flex-col gap-2">
          <StarRating value={rating} onChange={setRating} />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="bg-(--bg-card) text-(--text-primary) text-sm rounded-xl p-2 outline-none resize-none"
            rows={2}
          />
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setEditing(false)}
              className="text-xs text-(--text-secondary) px-3 py-1.5 bg-(--bg-card) rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="text-xs text-(--text-primary) px-3 py-1.5 bg-(--bg-card) rounded-xl border border-(--border)"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <StarRating value={review.rating} readonly />
          <p className="text-(--text-secondary) text-sm">{review.comment}</p>
        </>
      )}
    </div>
  );
}

export default function ReviewCard({ city }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast, showModal } = useUI();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getReviews(city);
        const sorted = [...res.data].sort((a, b) => {
          if (a.userId === user?.uid) return -1;
          if (b.userId === user?.uid) return 1;
          return 0;
        });
        setReviews(sorted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [city, user]);

  const handleSubmit = async () => {
    if (!comment.trim()) return;
    setSubmitting(true);
    try {
      const res = await addReview({ city, rating, comment });
      setReviews((prev) => [
        ...prev,
        {
          id: res.data.id,
          city,
          rating,
          comment,
          userId: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
      ]);
      setComment("");
      setRating(5);
      showToast("Review added ⭐");
    } catch {
      showToast("Failed to add review", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await updateReview(id, data);
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, ...data } : r))
      );
      showToast("Review updated");
    } catch {
      showToast("Failed to update", "error");
    }
  };

  const handleDelete = (id) => {
    showModal({
      title: "Delete review",
      message: "Are you sure you want to delete this review?",
      onConfirm: async () => {
        try {
          await deleteReview(id);
          setReviews((prev) => prev.filter((r) => r.id !== id));
          showToast("Review deleted");
        } catch {
          showToast("Failed to delete", "error");
        }
      },
    });
  };

  return (
    <div className="bg-(--bg-card) rounded-2xl p-6 border border-(--border) flex flex-col gap-4">
      <h2 className="text-(--text-primary) font-semibold">Reviews</h2>

      {/* Form */}
      {user ? (
        <div className="flex flex-col gap-4 bg-(--bg-input) rounded-2xl p-4 w-full">
          <h2 className="text-(--text-primary) font-semibold text-base">
            Submit your review
          </h2>

          <div className="flex flex-col gap-1.5">
            <p className="text-(--text-secondary) text-xs font-medium">
              Your rating
            </p>
            <StarRating value={rating} onChange={setRating} />
          </div>

          <div className="flex flex-col gap-1.5">
            <p className="text-(--text-secondary) text-xs font-medium">
              Your review
            </p>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              className="bg-(--bg-card) text-(--text-primary) text-sm rounded-xl p-3 outline-none resize-none placeholder:text-(--text-muted) border border-(--border) focus:border-(--text-muted) transition-colors"
              rows={3}
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-(--text-muted) text-xs">
              {comment.trim().length > 0
                ? `${comment.trim().length} characters`
                : ""}
            </p>
            <button
              onClick={handleSubmit}
              disabled={submitting || !comment.trim() || !rating}
              className="text-sm px-5 py-1.5 bg-(--bg-card) text-(--text-primary) rounded-full border border-(--border) hover:bg-(--bg-input) transition-colors disabled:opacity-40"
            >
              {submitting ? "Posting..." : "Post review"}
            </button>
          </div>
        </div>
      ) : (
        <p className="text-(--text-secondary) text-sm">
          <span
            className="text-(--text-primary) underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>{" "}
          to leave a review
        </p>
      )}

      {/* Reviews list */}
      {loading ? (
        <div className="flex flex-col gap-2">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-20 bg-(--bg-input) rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <EmptyState
          icon="search"
          title="No reviews yet"
          message="Be the first to review!"
        />
      ) : (
        <div className="flex flex-col gap-2">
          {reviews.map((r) => (
            <ReviewItem
              key={r.id}
              review={r}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
