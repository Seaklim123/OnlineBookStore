import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    if (!links || links.length <= 1) return null;

    return (
        <ul className="pagination pagination-sm m-0 float-right">
            {links.map((link, key) => (
                <li
                    key={key}
                    className={`page-item ${link.active ? 'active' : ''} ${!link.url ? 'disabled' : ''}`}
                >
                    {link.url ? (
                        <Link
                            href={link.url}
                            className="page-link"
                            dangerouslySetInnerHTML={{
                                __html: link.label.replace('&laquo;', '<').replace('&raquo;', '>')
                            }}
                        />
                    ) : (
                        <span
                            className="page-link"
                            dangerouslySetInnerHTML={{
                                __html: link.label.replace('&laquo;', '<').replace('&raquo;', '>')
                            }}
                        />
                    )}
                </li>
            ))}
        </ul>
    );
}
