import { useReducer, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCalendarAlt, FaArrowRight, FaPenNib } from "react-icons/fa";

type BlogPost = {
  title: string;
  date: string;
  readingTime: string;
  url: string;
  image: string;
  category: string;
};

type State = {
  posts: BlogPost[];
  loading: boolean;
  error: string | null;
};

type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: BlogPost[] }
  | { type: "FETCH_ERROR"; payload: string };

function blogReducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, posts: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default function BlogSection() {
  const [state, dispatch] = useReducer(blogReducer, {
    posts: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchPosts = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const response = await fetch(
          "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@abhishekdoshi26"
        );
        const data = await response.json();

        if (data.status === "ok") {
          const mappedPosts: BlogPost[] = data.items.map((item: any) => {
            // Extract image from description if thumbnail is missing or is just the Medium avatar
            let imageUrl = item.thumbnail;
            if (!imageUrl || imageUrl.includes("cdn-images-1.medium.com/fit/c/150/150")) {
              const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
              if (imgMatch) {
                imageUrl = imgMatch[1];
              }
            }

            return {
              title: item.title,
              date: new Date(item.pubDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              }),
              readingTime: `${Math.ceil(item.content.replace(/<[^>]*>?/gm, '').split(/\s+/).length / 200)} min read`,
              url: item.link,
              image: imageUrl || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80",
              category: item.categories[0] || "General",
            };
          });
          dispatch({ type: "FETCH_SUCCESS", payload: mappedPosts.slice(0, 6) });
        } else {
          dispatch({ type: "FETCH_ERROR", payload: "Failed to fetch stories" });
        }
      } catch (err) {
        dispatch({ type: "FETCH_ERROR", payload: "Failed to load publications" });
      }
    };

    fetchPosts();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 80,
      },
    },
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      flutter: "from-blue-400 to-blue-600",
      firebase: "from-amber-400 to-orange-600",
      dart: "from-cyan-400 to-blue-500",
      android: "from-green-400 to-emerald-600",
      ios: "from-slate-400 to-slate-600",
    };
    return colors[category.toLowerCase()] || "from-primary to-primary/60";
  };

  return (
    <section id="blog" className="py-32 md:py-48 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 border border-border text-muted-foreground text-xs font-bold tracking-[0.2em] uppercase mb-8">
            <FaPenNib />
            Publications
          </div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-8">
            Insights & <span className="text-gradient-primary">Journal</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-xl leading-relaxed">
            Deep dives into mobile engineering, architecture, and the future of
            cross-platform development.
          </p>
        </motion.div>

        {state.loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="glass-card h-[500px] animate-pulse bg-accent/20" />
            ))}
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {state.posts.map((post, index) => (
              <motion.div
                key={index}
                variants={item}
                className="glass-card overflow-hidden group flex flex-col hover:bg-accent/20 transition-all duration-500 hover:-translate-y-2"
              >
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col h-full"
                >
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                    <div className="absolute top-6 left-6">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold text-white uppercase tracking-widest bg-gradient-to-r ${getCategoryColor(post.category)} shadow-2xl`}>
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-10 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-[0.2em] mb-6">
                      <FaCalendarAlt className="text-primary/60" />
                      <span>{post.date}</span>
                      <span className="text-primary/30">•</span>
                      <span>{post.readingTime}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-8 text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-[1.3] tracking-tight">
                      {post.title}
                    </h3>
                    <div className="mt-auto flex items-center gap-3 text-xs font-bold text-foreground uppercase tracking-widest group-hover:gap-5 transition-all duration-500">
                      <span>Explore Journal</span>
                      <FaArrowRight className="text-primary" />
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-24"
        >
          <a
            href="https://medium.com/@abhishekdoshi26"
            target="_blank"
            rel="noopener noreferrer"
            className="apple-button-secondary !py-4 !px-10 flex items-center gap-4 group"
          >
            <span className="font-bold">Explore Full Archive</span>
            <FaArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}