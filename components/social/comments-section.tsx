import { CommentForm } from "@/components/social/comment-form";
import { DeleteCommentForm } from "@/components/social/delete-comment-form";
import { type Locale } from "@/lib/i18n";
import { formatDateTime } from "@/lib/utils";

type CommentItem = {
  id: string;
  bonsaiId: string;
  authorId: string;
  content: string;
  createdAt: Date;
  author: {
    id: string;
    name: string | null;
    image: string | null;
  };
  replies: Array<{
    id: string;
    bonsaiId: string;
    authorId: string;
    content: string;
    createdAt: Date;
    author: {
      id: string;
      name: string | null;
      image: string | null;
    };
  }>;
};

export function CommentsSection({
  bonsaiId,
  ownerId,
  currentUserId,
  comments,
  locale
}: {
  bonsaiId: string;
  ownerId: string;
  currentUserId?: string | null;
  comments: CommentItem[];
  locale: Locale;
}) {
  const isOwner = currentUserId === ownerId;

  return (
    <section className="space-y-5 rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(15,19,18,0.96),rgba(9,12,11,0.94))] p-5 shadow-card sm:p-6">
      <div>
        <h2 className="font-display text-3xl text-paper">
          {locale === "es" ? "Comentarios" : locale === "en" ? "Comments" : "コメント"}
        </h2>
        <p className="mt-2 text-sm leading-7 text-paper/56">
          {locale === "es"
            ? "Comparte observaciones sobre el árbol o deja preguntas para su propietario."
            : locale === "en"
              ? "Share observations about the tree or leave questions for its owner."
              : "この樹についての気づきや、オーナーへの質問を残せます。"}
        </p>
      </div>

      {currentUserId ? (
        <div className="rounded-[1.6rem] bg-white/[0.035] p-4">
          <CommentForm bonsaiId={bonsaiId} ownerId={ownerId} locale={locale} />
        </div>
      ) : (
        <div className="rounded-[1.6rem] border border-dashed border-white/10 px-5 py-5 text-sm text-paper/62">
          {locale === "es"
            ? "Inicia sesión para votar y comentar en los bonsáis públicos."
            : locale === "en"
              ? "Sign in to vote and comment on public bonsai."
              : "公開盆栽に投票やコメントするにはログインしてください。"}
        </div>
      )}

      {comments.length === 0 ? (
        <p className="rounded-[1.6rem] bg-white/[0.035] px-5 py-6 text-sm text-paper/56">
          {locale === "es" ? "Todavía no hay comentarios." : locale === "en" ? "There are no comments yet." : "まだコメントがありません。"}
        </p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => {
            const canDeleteComment =
              currentUserId === ownerId || currentUserId === comment.authorId;

            return (
              <article
                key={comment.id}
                className="rounded-[1.7rem] bg-white/[0.04] p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-paper">
                      {comment.author.name ?? (locale === "es" ? "Usuario Kodama" : locale === "en" ? "Kodama user" : "Kodama ユーザー")}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.1em] text-paper/42">
                      {formatDateTime(comment.createdAt)}
                    </p>
                  </div>
                  {canDeleteComment ? (
                    <DeleteCommentForm
                      commentId={comment.id}
                      bonsaiId={bonsaiId}
                      ownerId={ownerId}
                      locale={locale}
                    />
                  ) : null}
                </div>

                <p className="mt-4 text-[0.98rem] leading-7 text-paper/78">
                  {comment.content}
                </p>

                {comment.replies.length > 0 ? (
                  <div className="mt-4 space-y-3 border-l border-white/8 pl-4">
                    {comment.replies.map((reply) => {
                      const canDeleteReply =
                        currentUserId === ownerId || currentUserId === reply.authorId;

                      return (
                        <div
                          key={reply.id}
                          className="rounded-[1.4rem] bg-black/20 p-4"
                        >
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold text-paper">
                                {reply.author.name ?? (locale === "es" ? "Usuario Kodama" : locale === "en" ? "Kodama user" : "Kodama ユーザー")}
                              </p>
                              <p className="mt-1 text-xs uppercase tracking-[0.1em] text-paper/42">
                                {formatDateTime(reply.createdAt)}
                              </p>
                            </div>
                            {canDeleteReply ? (
                              <DeleteCommentForm
                                commentId={reply.id}
                                bonsaiId={bonsaiId}
                                ownerId={ownerId}
                                locale={locale}
                              />
                            ) : null}
                          </div>
                          <p className="mt-3 text-sm leading-7 text-paper/72">
                            {reply.content}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                ) : null}

                {isOwner ? (
                  <div className="mt-4 rounded-[1.4rem] border border-white/8 bg-black/20 p-4">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-paper/46">
                      {locale === "es" ? "Responder como propietario" : locale === "en" ? "Reply as owner" : "オーナーとして返信"}
                    </p>
                    <CommentForm
                      bonsaiId={bonsaiId}
                      ownerId={ownerId}
                      parentCommentId={comment.id}
                      placeholder={
                        locale === "es"
                          ? "Añade una respuesta directa a este comentario"
                          : locale === "en"
                            ? "Add a direct reply to this comment"
                            : "このコメントに直接返信を追加"
                      }
                      locale={locale}
                    />
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
