import { Link } from "@inertiajs/react";

export default function Breadcrumb({ header, links = [] }) {
    return (
        <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1>{header}</h1>
                    </div>

                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            {links.map((item, k) => {
                                // 👉 BUTTON (Create / Delete)
                                if (item.type === 'button') {
                                    return (
                                        <li key={k} className="breadcrumb-item">
                                            <Link
                                                href={item.url}
                                                className={item.className}
                                            >
                                                {item.title}
                                            </Link>
                                        </li>
                                    );
                                }

                                // 👉 NORMAL LINK
                                if (item.url) {
                                    return (
                                        <li key={k} className="breadcrumb-item">
                                            <Link href={item.url}>
                                                {item.title}
                                            </Link>
                                        </li>
                                    );
                                }

                                // 👉 ACTIVE TEXT
                                return (
                                    <li key={k} className="breadcrumb-item active">
                                        {item.title}
                                    </li>
                                );
                            })}
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    );
}
