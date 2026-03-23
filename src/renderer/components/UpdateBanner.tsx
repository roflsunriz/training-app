interface UpdateBannerProps {
  readonly message: string
}

export function UpdateBanner({ message }: UpdateBannerProps): React.JSX.Element {
  return (
    <div className="rounded-lg border border-sky-200 bg-sky-50 px-4 py-2 text-sm text-sky-700">
      {message}
    </div>
  )
}
